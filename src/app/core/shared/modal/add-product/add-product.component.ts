import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryResponse} from "../../../model/categoryResponse";
import {CategoryService} from "../../../service/category.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ProductPageComponent} from "../../../../page/product-page/product-page.component";
import {ProductResponse} from "../../../model/productResponse";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [CategoryService, ProductService]
})
export class AddProductComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
  categoryList: CategoryResponse[] = []
  product: ProductResponse | undefined
  form: any;
  imageUrl: any


  constructor(private categoryService: CategoryService, private productService: ProductService,
              private productPageComponent : ProductPageComponent) {
  }

  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe(response =>{
      this.categoryList = response
    })
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      price: new FormControl('',[Validators.min(1), Validators.required] ),
      quantity: new FormControl('',[Validators.min(1), Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      categoryId: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required)
    })
  }

  get title(){
    return this.form.get('title');
  }

  get price(){
    return this.form.get('price');
  }

  get quantity(){
    return this.form.get('quantity');
  }

  get description(){
    return this.form.get('description');
  }

  get photo(){
    return this.form.get('photo');
  }

  get categoryId(){
    return this.form.get('categoryId');
  }

  closePopup() {
    this.close.emit();
  }


  onAddProduct(value: any) {
      this.productService.addProduct(value).subscribe(response => {
        const fileInput: HTMLInputElement | null = document.getElementById('imageInput') as HTMLInputElement;
        const file: File | null = fileInput?.files?.[0] || null;
        if (file) {
          this.productService.uploadImage(response.id, file).subscribe(response => {
            this.productPageComponent.isPopupOpen = false
          })
        }
      })
  }

  removeImage() {
    const elementById:HTMLElement | any = document.getElementById("imageInput");
    elementById.value = null
    this.imageUrl = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.form.patchValue({
          image: file
        });
      };
    }
  }
}

import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {ProductResponse} from "../../../model/productResponse";
import {switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ProductEdit} from "../../../model/productEdit";
import {response} from "express";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  product:ProductResponse | any
  form: any
  productEdit: ProductEdit| any
  productId: string | any

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(productResponse => {
        return this.productService.findById(productResponse['id'])
    })
    ).subscribe(product => {
        this.product = product
        this.productId = product.id
        this.form = new FormGroup({
          title: new FormControl(this.product.title, [Validators.required, Validators.minLength(1)]),
          price: new FormControl(this.product.price,[Validators.min(1), Validators.required] ),
          quantity: new FormControl(this.product.quantity,[Validators.min(1), Validators.required]),
          description: new FormControl(this.product.description, [Validators.required, Validators.minLength(10)])
        })
      }

    )
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


  onSubmit() {
    const edit: ProductEdit = {
      title: this.form.value.title,
      price: this.form.value.price,
      quantity: this.form.value.quantity,
      description: this.form.value.description
    }

    this.productService.editProduct(edit, this.productId).subscribe(
      response =>{
        this.router.navigate(['/products'])
      }
    );
  }
}

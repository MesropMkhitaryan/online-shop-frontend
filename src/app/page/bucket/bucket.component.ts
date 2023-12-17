import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "../../core/shared/layout/header/header.component";
import {FooterComponent} from "../../core/shared/layout/footer/footer.component";
import {BucketService} from "../../core/service/bucket.service";
import {Bucket} from "../../core/model/bucket";
import {UserService} from "../../core/service/user.service";
import {ProductsComponent} from "../../core/shared/components/products/products.component";
import {ProductResponse} from "../../core/model/productResponse";
import {OrderService} from "../../core/service/order.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-bucket',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ProductsComponent, FormsModule],
  providers: [BucketService, UserService, OrderService],
  templateUrl: './bucket.component.html',
  styleUrl: './bucket.component.css'
})
export class BucketComponent implements OnInit, AfterViewInit, AfterViewChecked {
  bucket: Bucket | any;
  products: ProductResponse[] | any
  productIds: string[] = []

  imageUrl: any = `http://localhost:8082/api/v1/product/getProductPic/`
  @ViewChildren('quantityInput, plusButton, minusButton') inputButtonPairs: QueryList<ElementRef> | any;
  priceSum: number | any
  @ViewChildren('priceInputRef') xElements: QueryList<ElementRef> | any;
  checkboxStates: boolean[] = [];

  constructor(private bucketService: BucketService, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.bucketService.getBucket().subscribe(response => {
      this.bucket = response
      this.products = this.bucket.product
      this.countSum()
    })
    localStorage.setItem("moduleValues", JSON.stringify(this.productIds));
  }

  ngAfterViewChecked() {
    this.countSum()
    this.bucketService.getBucket()
    for (const product of this.products) {
      this.disableButtons(product)
    }
  }

  ngAfterViewInit(): void {
    for (const product of this.products) {
      this.disableButtons(product)
    }
  }

  getProductQuantities(): { [productId: string]: number } {
    const productQuantities: { [productId: string]: number } = {};

    // @ts-ignore
    this.products.forEach(product => {
      if (this.checkboxStates[product.id]) {
        const quantityInput: HTMLInputElement | any = document.getElementById("quantity-input-" + product.id);
        const currentValue = parseInt(quantityInput.value, 10) || 0;
        productQuantities[product.id] = currentValue;
      }
    });

    return productQuantities;
  }

  addQuantity(product: any) {
    const quantityInput: HTMLInputElement | any = document.getElementById("quantity-input-" + product.id);
    const currentValue = parseInt(quantityInput.value, 10) || 0; // Parse the current value as an integer (or default to 0 if parsing fails)
    const priceInput: HTMLInputElement | any = document.getElementById("price-input-" + product.id)
    if (currentValue < parseInt(quantityInput.max, 10)) { // Parse max as well
      quantityInput.value = currentValue + 1;
      priceInput.value = product.price * parseInt(quantityInput.value, 10);
    }
    this.disableButtons(product)
    this.countSum()
  }

  minusQuantity(product: any) {
    const quantityInput: HTMLInputElement | any = document.getElementById("quantity-input-" + product.id);
    const currentValue = parseInt(quantityInput.value, 10) || 0; // Parse the current value as an integer (or default to 0 if parsing fails)
    const priceInput: HTMLInputElement | any = document.getElementById("price-input-" + product.id)
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
      priceInput.value = product.price * parseInt(quantityInput.value, 10);
    }
    this.disableButtons(product)
    this.countSum()
  }

  countSum() {
    let totalSum = 0

    this.xElements.forEach((priceInputRef: { nativeElement: any; }, productId: string) => {
      const nativeElement = priceInputRef.nativeElement;
      let id = nativeElement.id;
      let s = id.substring(12,);

      // @ts-ignore
      if (this.checkboxStates[s]) {
        totalSum += parseInt(nativeElement.value);
      }
    });
    this.priceSum = totalSum
  }

  onDelete(id: string | any) {
    this.bucketService.deleteProductFromBucket(id).subscribe(response => {
      this.bucketService.getBucket().subscribe(response => {
        this.bucket = response
        this.products = this.bucket.products
      })
    })
  }

  orderProduct() {
    const order = {
      sum: this.priceSum,
      productIds: this.productIds,
      quantity: this.getProductQuantities()
    }
    this.orderService.orderProduct(order).subscribe(response => {
      console.log(response)
      this.bucketService.getBucket().subscribe(response => {
        this.bucket = response
        this.products = this.bucket.products
      })
    })
  }

  disableButtons(product: any) {
    const quantityInput: HTMLInputElement | any = document.getElementById("quantity-input-" + product.id);
    const minusButton: HTMLButtonElement | any = document.getElementById("minus-button-" + product.id);
    const plusButton: HTMLButtonElement | any = document.getElementById("plus-button-" + product.id);

    plusButton.disabled = quantityInput.value == quantityInput.max;
    minusButton.disabled = quantityInput.value == 1;
  }


  addProductToLocal(product: any) {
    if (this.checkboxStates[product.id]) {
      if (!this.productIds) {
        this.productIds = [];
      }

      this.productIds.push(product.id);

      localStorage.setItem("moduleValues", JSON.stringify(this.productIds));
    } else {
      if (this.productIds && this.productIds.length > 0) {
        const index = this.productIds.indexOf(product.id);

        if (index !== -1) {
          this.productIds.splice(index, 1);
        }

        localStorage.setItem("moduleValues", JSON.stringify(this.productIds));
      }
    }
    this.countSum()
  }
}

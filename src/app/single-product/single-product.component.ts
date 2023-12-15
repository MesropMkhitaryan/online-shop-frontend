import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../service/product.service";
import {ProductResponse} from "../model/productResponse";
import {HeaderComponent} from "../shared/components/header/header.component";
import {FooterComponent} from "../shared/components/footer/footer.component";
import {UserService} from "../service/user.service";
import {OrderService} from "../service/order.service";

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css',],
  providers: [ProductService, UserService, OrderService]

})
export class SingleProductComponent implements OnInit, AfterViewInit {
  product: ProductResponse | any
  id: string | any
  imageUrl: any = `http://localhost:8082/api/v1/product/getProductPic/`
  priceSum: number | any
  productIds: string[] = []
  quantity: number | any
  isLoggedIn: boolean = true


  constructor(private activeRoute: ActivatedRoute, private productService: ProductService,
              private orderService: OrderService, private router: Router) {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.id = <string>params.get('id');
      if (this.id) {
        this.productService.findById(this.id).subscribe(response => {
          this.product = response
          this.priceSum = response.price
          this.quantity = 1
          this.productIds.push(response.id)
        })
      }
    });


  }

  ngAfterViewInit(): void {
    if (!localStorage.getItem('token')) {
      this.isLoggedIn = false
    }
    this.disableButtons(this.product)
  }

  getProductQuantity(): { [productId: string]: number } {
    const productQuantities: { [productId: string]: number } = {};

    // @ts-ignore

    const quantityInput: HTMLInputElement | any = document.getElementById("quantity-input");
    const currentValue = parseInt(quantityInput.value, 10) || 0;
    productQuantities[this.product.id] = currentValue;
    return productQuantities;
  }

  orderProduct() {
    const order = {
      sum: this.priceSum,
      productIds: this.productIds,
      quantity: this.getProductQuantity()
    }

    this.orderService.orderProduct(order).subscribe(response => {
      console.log(response)
      this.router.navigate(['home'])
    })
  }

  minusQuantity(product: any) {
    const quantityInput: HTMLInputElement | any = document.getElementById("quantity-input");
    const currentValue = parseInt(quantityInput.value, 10) || 0;
    const priceInput: HTMLInputElement | any = document.getElementById("price-input")

    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
      priceInput.value = product.price * parseInt(quantityInput.value, 10);
      this.priceSum = priceInput.value
      this.quantity = parseInt(quantityInput.value)
    }
    this.disableButtons(product)
  }

  addQuantity(product: any) {
    const quantityInput: HTMLInputElement | any = document.getElementById("quantity-input");
    const currentValue = parseInt(quantityInput.value, 10) || 0; // Parse the current value as an integer (or default to 0 if parsing fails)
    const priceInput: HTMLInputElement | any = document.getElementById("price-input")

    if (currentValue < parseInt(quantityInput.max, 10)) { // Parse max as well
      quantityInput.value = currentValue + 1;
      priceInput.value = product.price * parseInt(quantityInput.value, 10);
      this.priceSum = priceInput.value
      this.quantity = parseInt(quantityInput.value)
    }
    this.disableButtons(product)
  }

  disableButtons(product: any) {
    const quantityInput: HTMLInputElement | any = document.getElementById("quantity-input");
    const minusButton: HTMLButtonElement | any = document.getElementById("minus-button");
    const plusButton: HTMLButtonElement | any = document.getElementById("plus-button");

    plusButton.disabled = quantityInput.value == quantityInput.max;
    minusButton.disabled = quantityInput.value == 1;
  }

}

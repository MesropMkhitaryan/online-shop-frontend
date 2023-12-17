import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../../core/shared/layout/header/header.component";
import {FooterComponent} from "../../core/shared/layout/footer/footer.component";
import {UserService} from "../../core/service/user.service";
import {ProductService} from "../../core/service/product.service";
import {ProductResponse} from "../../core/model/productResponse";
import {ProductsComponent} from "../../core/shared/components/products/products.component";
import {AddProductComponent} from "../../core/shared/modal/add-product/add-product.component";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ProductsComponent, AddProductComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  providers: [UserService]
})
export class ProductPageComponent implements OnInit {

  public productList: ProductResponse[] = []

  constructor(private productService: ProductService) {
  }
  isPopupOpen = false;

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  ngOnInit(): void {
    this.productService.myProductList().subscribe(response => {
        this.productList = response
    })
  }

}

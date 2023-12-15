import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../shared/components/header/header.component";
import {FooterComponent} from "../shared/components/footer/footer.component";
import {UserService} from "../service/user.service";
import {ProductService} from "../service/product.service";
import {ProductResponse} from "../model/productResponse";
import {ProductsComponent} from "../shared/components/products/products.component";
import {AddProductComponent} from "../shared/modal/add-product/add-product.component";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ProductsComponent, AddProductComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css',  '../shared/styles/css/bootstrap.css', '../shared/styles/css/responsive.css',
    '../shared/styles/css/style.css','../shared/styles/css/style.scss'],
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

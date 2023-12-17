import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "../../core/shared/layout/footer/footer.component";
import {HeaderComponent} from "../../core/shared/layout/header/header.component";
import {ProductsComponent} from "../../core/shared/components/products/products.component";
import {ProductResponse} from "../../core/model/productResponse";
import {ProductService} from "../../core/service/product.service";
import {RouterOutlet} from "@angular/router";
import {UserService} from "../../core/service/user.service";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, LoginComponent, ProductsComponent, RouterOutlet],
  providers: [UserService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public productList: ProductResponse[] = []
  imageUrl = "assets/images/slider-bg.jpg"

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.productList().subscribe(response => {
      this.productList = response
    })
  }

}

import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "../components/footer/footer.component";
import {HeaderComponent} from "../components/header/header.component";
import {ProductsComponent} from "../components/products/products.component";
import {ProductResponse} from "../../model/productResponse";
import {ProductService} from "../../service/product.service";
import {RouterOutlet} from "@angular/router";
import {UserService} from "../../service/user.service";
import {LoginComponent} from "../../login/login.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, LoginComponent, ProductsComponent, RouterOutlet],
  providers: [UserService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'  ]
})
export class HomeComponent implements OnInit{

  public productList: ProductResponse[] = []
  imageUrl = "assets/images/slider-bg.jpg"

  constructor(private productService: ProductService, private userService: UserService) {
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

import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "../../core/shared/layout/footer/footer.component";
import {HeaderComponent} from "../../core/shared/layout/header/header.component";
import {ProductCardComponent} from "../../core/shared/components/products/product-card.component";
import {ProductResponse} from "../../core/model/productResponse";
import {ProductService} from "../../core/service/product.service";
import {RouterOutlet} from "@angular/router";
import {UserService} from "../../core/service/user.service";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../../core/service/auth.service";
import {response} from "express";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, LoginComponent, ProductCardComponent, RouterOutlet],
  providers: [UserService,AuthService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  imageUrl = "assets/images/slider-bg.jpg"
  productList: any[] = [];
  private productSubscription: Subscription | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productSubscription = this.productService.productList().subscribe((response) => {
      this.productList = response;
    });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}

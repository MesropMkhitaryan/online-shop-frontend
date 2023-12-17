import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ProductService} from "./core/service/product.service";
import {ProductResponse} from "./core/model/productResponse";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./core/shared/layout/header/header.component";
import {ProductsComponent} from "./core/shared/components/products/products.component";
import {FooterComponent} from "./core/shared/layout/footer/footer.component";
import {TokenService} from "./core/service/token.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, RouterLink, RouterLinkActive, HeaderComponent, ProductsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ProductService, HttpClient]
})
export class AppComponent implements OnInit {
  title = 'online-shop-frontend';
  imageUrl = "assets/images/slider-bg.jpg"

  constructor() {
  }

  ngOnInit(): void {
  }

}

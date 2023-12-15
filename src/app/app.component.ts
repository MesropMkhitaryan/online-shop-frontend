import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ProductService} from "./service/product.service";
import {ProductResponse} from "./model/productResponse";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./shared/components/header/header.component";
import {ProductsComponent} from "./shared/components/products/products.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {TokenService} from "./service/token.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, RouterLink, RouterLinkActive, HeaderComponent, ProductsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService, HttpClient]
})
export class AppComponent implements OnInit {
  title = 'online-shop-frontend';
  public productList: ProductResponse[] = []
  imageUrl = "assets/images/slider-bg.jpg"
  jsFile = "app/shared/js/bootstrap.js"

  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
  }


}

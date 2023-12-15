import { Routes } from '@angular/router';
import path from "path";
import {ProductsComponent} from "./shared/components/products/products.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./shared/home/home.component";
import {LoginComponent} from "./login/login.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {BucketComponent} from "./bucket/bucket.component";
import {SingleProductComponent} from "./single-product/single-product.component";
import {guard} from "./guards/guard";
import {EditProductComponent} from "./shared/modal/edit-product/edit-product.component";

export const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'products', component: ProductPageComponent, canActivate: [guard]
  },
  {
    path: 'product/:id', component: SingleProductComponent
  },
  {
    path: 'bucket', component: BucketComponent, canActivate: [guard]
  },
  {
    path:'edit/:id', component: EditProductComponent
  }

];

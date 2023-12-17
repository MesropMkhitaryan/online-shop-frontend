import {Routes} from '@angular/router';
import {RegisterComponent} from "./page/register/register.component";
import {HomeComponent} from "./page/home/home.component";
import {LoginComponent} from "./page/login/login.component";
import {ProductPageComponent} from "./page/product-page/product-page.component";
import {BucketComponent} from "./page/bucket/bucket.component";
import {SingleProductComponent} from "./page/single-product/single-product.component";
import {isAuthenticatedGuard} from "./core/guards/isAuthenticatedGuard";
import {EditProductComponent} from "./core/shared/modal/edit-product/edit-product.component";
import {SystemComponent} from "./system/system.component";
import {NotFoundComponent} from "./core/wildcard/not-found/not-found.component";

export const routes: Routes = [
  {
    path: '', component: SystemComponent, children: [
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
        path: 'products', component: ProductPageComponent, canActivate: [isAuthenticatedGuard]
      },
      {
        path: 'product/:id', component: SingleProductComponent
      },
      {
        path: 'bucket', component: BucketComponent, canActivate: [isAuthenticatedGuard]
      },
      {
        path: 'edit/:id', component: EditProductComponent
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]
  }

];

import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  ],
};

export const PRODUCT_IMAGE_URL = 'http://localhost:8082/api/v1/product/getProductPic/';


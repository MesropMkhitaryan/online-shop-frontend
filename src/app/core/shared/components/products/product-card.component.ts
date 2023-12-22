import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService} from "../../../service/product.service";
import {BucketService} from "../../../service/bucket.service";
import {Router, RouterLink} from "@angular/router";
import {ProductResponse} from "../../../model/productResponse";
import {AuthService} from "../../../service/auth.service";
import {Subject, takeUntil} from "rxjs";
import {PRODUCT_IMAGE_URL} from "../../../../app.config";


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [BucketService, ProductService, AuthService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product: ProductResponse | undefined
  imageUrl: any = PRODUCT_IMAGE_URL
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  isCreator: boolean = false
  currentUserId: string | any
  isLoggedIn: boolean = false

  constructor(public bucketService: BucketService, private route: Router,
              private productService: ProductService, private authService: AuthService) {
  }

  ngAfterViewInit(): void {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;

        if (isAuthenticated) {
          this.productService.findByToken().subscribe((response) => {
            if (response.length > 0) {
              this.currentUserId = response;
              console.log(response);
              this.isCreator = this.product?.userId == this.currentUserId;
              console.log(this.isCreator);
            }
          });
        }
      });
  }

  ngOnInit(): void {
    // this.authService.isAuthenticated$
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((isAuthenticated) => {
    //     this.isLoggedIn = isAuthenticated;
    //
    //     if (isAuthenticated) {
    //       this.productService.findByToken().subscribe((response) => {
    //         if (response.length > 0) {
    //           this.currentUserId = response;
    //           console.log(response);
    //           this.isCreator = this.product?.userId == this.currentUserId;
    //           console.log(this.isCreator);
    //         }
    //       });
    //     }
    //   });
  }


  public goToSinglePage(id: string | any){
    this.route.navigate(['/product', id])
  }

  onAddBucket(id: string | undefined) {
      this.bucketService.addProductToBucket(id)
  }

  onProductDelete(id: string | undefined) {
    this.productService.deleteProduct(id);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }





}

import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService} from "../../../service/product.service";
import {BucketService} from "../../../service/bucket.service";
import {Router, RouterLink} from "@angular/router";
import {ProductResponse} from "../../../model/productResponse";
import { MatDialog } from '@angular/material/dialog';
import {EditProductComponent} from "../../modal/edit-product/edit-product.component";


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [BucketService, ProductService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() product: ProductResponse | undefined
  // @ts-ignore
  imageUrl: any = `http://localhost:8082/api/v1/product/getProductPic/`
  isCreator: boolean = false
  currentUserId: string | any
  isLoggedIn: boolean = true
  constructor( public bucketService: BucketService, private dialog: MatDialog, private route: Router, private productService: ProductService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.productService.findByToken().subscribe(response => {
        if (response.length > 0) {
          this.isLoggedIn = false
          this.currentUserId = response
          console.log(response)
          if (this.product?.userId == this.currentUserId) {
            this.isCreator = true
            console.log(this.isCreator)
          }
        }
      })
    }

  }

  public goToSinglePage(id: string | any){
    this.route.navigate(['/product', id])
  }

  onAddBucket(id: string | undefined) {
      this.bucketService.addProductToBucket(id)
  }

  onProductDelete(id: string | undefined) {
    this.productService.deleteProduct(id).subscribe(response=>{

    })
  }

}

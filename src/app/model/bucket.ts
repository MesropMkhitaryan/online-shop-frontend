import {ProductResponse} from "./productResponse";

export interface Bucket{
  id: string
  userId: string
  products: ProductResponse []
}

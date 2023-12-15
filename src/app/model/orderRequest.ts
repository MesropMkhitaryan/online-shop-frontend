export interface OrderRequest {
  sum: number
  productIds: string[]
  quantity: { [productId: string]: number };

}

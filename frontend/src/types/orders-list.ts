export type Order = {
  id: number,
  is_ordered: boolean,
  time_created: string,
  time_checkout: string,
  time_delivery: null,
  products: Product[]
}

type Product = {
  order_id: number,
  product_id: number,
  price: string,
  quantity: number,
  product: string
}
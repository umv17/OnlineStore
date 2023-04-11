export type Brand = {
  id: number
  title: string
}

export type Review = {}

export type FullProduct = {
  id: number,
  title: string,
  price: string,
  old_price: string,
  quantity: number,
  photo: string | null,
  brand: {
    id: number,
    title: string
  },
  description: string,
  reviews: Review[]
}

export type ModestProduct = Omit<Omit<FullProduct, 'description'>, 'reviews'>

// export type ModestProduct = {
//   id: number
//   title: string
//   price: number
//   old_price: number
//   photo: string | null
// }

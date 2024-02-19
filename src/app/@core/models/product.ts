export interface Product extends ExtraProduct {
  id: number
  name: string
  price: number
  quantity: number
  thumbnail: string
  status: boolean
}

export interface ExtraProduct {
  totalPrice?: number
}

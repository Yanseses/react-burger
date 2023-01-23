export interface IIngridient {
  name: string,
  _id: string,
  type: string,
  image: string,
  price: number,
  counter: number,
  calories?: number,
  carbohydrates?: number,
  fat?: number,
  image_large?: string,
  image_mobile?: string,
  proteins?: number,
  id?: string
}

export type TUrlParams = {
  id: string
}
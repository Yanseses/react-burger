import { FormEvent, LegacyRef } from 'react';

export interface IConstructorMainItem {
  element: IIngridient,
  onClick: Function,
  index: number
}

export interface IIngridient {
  name: string,
  _id: string,
  type: string,
  image: string,
  price: number,
  __v: number,
  calories?: number,
  carbohydrates?: number,
  fat?: number,
  image_large?: string,
  image_mobile?: string,
  proteins?: number,
  id?: string
}

export type TIngridientsCategory = {
  title: string;
  refCategory: any
}

export type TForm = {
  title?: string,
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

export type TItem = {
  text: string,
  Icon: Function,
  link: string
}

export type TModal = {
  title: string,
  onClose: () => void
}

export type TModalOverlay = {
  modalRef: LegacyRef<HTMLElement>
}

export type TUseForm = {
  [name: string]: string
}

export type TUrlParams = {
  id: string
}
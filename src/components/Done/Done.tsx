import { FC } from "react";

interface IDone {
  title: string,
  total?: number
}

export const Done: FC<IDone> = ({ title, total = 0 }) => {
  return (
    <div>
      <p className='text text_type_main-medium'>{title}</p>
      <p className='text text_type_digits-large'>{total}</p>
    </div>
  )
}
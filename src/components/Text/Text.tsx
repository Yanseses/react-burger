import { FC, PropsWithChildren } from "react"

export type TNumberSize = 'default' | 'medium' | 'large';
export type TTextSize = 'medium' | 'default' | 'large' | 'small';

interface IText {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div',
  textSize?: TTextSize,
  numberSize?: TNumberSize,
  isInactive?: boolean
}

export const Text: FC<PropsWithChildren<IText>> = ({ 
  As = 'div', 
  textSize,
  numberSize, 
  children,
  isInactive = false
}) => {

  return (
    <As className={ 
      textSize 
        ? `text text_type_main-${textSize} ${ isInactive ? 'text_color_inactive' : '' }`
        : `text text_type_digits-${numberSize} ${isInactive ? 'text_color_inactive' : ''}`
    }>
      { children }
    </As>
  )
}
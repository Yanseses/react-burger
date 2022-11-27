import React from "react";
import styles from './burgerConstructor.module.css';
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor(props){
  const [ ingridients, setIngridients ] = React.useState();

  const handleClose = () => {
    console.log(`ingridient removed`)
  }

  React.useEffect(() => {
    setIngridients(props.data)
  }, [props])

  return (
    <section className="pt-25 pl-8 pr-4">
      <div className={styles.constructor}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`Флюоресцентная булка R2-D3 (верх)`}
          price={988}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
          />
        <div className={styles.constructor__list}>
        { ingridients && ingridients.map(el => {
          if(el.type !== 'bun'){
            return (
              <div className={styles.constructor__listItem}>
                <DragIcon type="primary" />
                <ConstructorElement
                  key={el._id}
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                  handleClose={handleClose}
                />
              </div>
              )
            }
          })
        }
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`Флюоресцентная булка R2-D3 (низ)`}
          price={988}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
          />
      </div>
      <div className={`mt-10 ${styles.constructor__checkout}`}>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}
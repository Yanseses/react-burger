import { ingridientsSuccess, orderChangePrice, orderSuccess } from "../actions/main";
import { mainInitialState, mainStore } from "./main";

describe('Main reducer', () => {
  const state = mainInitialState;

  test('Should return initial state', () => {
    // @ts-ignore
    expect(mainStore(undefined, {})).toEqual(state)
  })

  test('Get ingridient success', () => {
    const ingridients = [
      {
        "_id": "60d3b41abdacab0026a733c7",
        "name": "Флюоресцентная булка R2-D3",
        "type": "bun",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
        "__v": 0,
        "counter": 0
      },
      {
        "_id": "60d3b41abdacab0026a733c8",
        "name": "Филе Люминесцентного тетраодонтимформа",
        "type": "main",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
        "__v": 0,
        "counter": 0
      }
    ]
    const ingridientsState = {
      ...state,
      ingridients: ingridients
    }

    expect(mainStore(state, ingridientsSuccess(ingridients))).toEqual(ingridientsState)
  })

  test('Change order price', () => {
    const orderState = {
      ...state,
      order: {
        main: [
          {
            "_id": "60d3b41abdacab0026a733c8",
            "name": "Филе Люминесцентного тетраодонтимформа",
            "type": "main",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
            "__v": 0,
            "counter": 0
          }
        ],
        buns: {
          "_id": "60d3b41abdacab0026a733c7",
          "name": "Флюоресцентная булка R2-D3",
          "type": "bun",
          "proteins": 44,
          "fat": 26,
          "carbohydrates": 85,
          "calories": 643,
          "price": 988,
          "image": "https://code.s3.yandex.net/react/code/bun-01.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
          "__v": 0,
          "counter": 0
        }
      }
    }
    const price = {
      ...orderState,
      orderPrice: 2964
    }

    expect(mainStore(orderState, orderChangePrice())).toEqual(price);
  })

  test('Order success', () => {
    const order = {
      ...state,
      orderRequest: false,
      orderFailed: false,
      orderNumber: 10
    }

    expect(mainStore(state, orderSuccess(10))).toEqual(order);
  })
})
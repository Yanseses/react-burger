import { addModalIngridient, ingridientsSuccess, orderBunsChange, orderChangePrice, orderClear, orderMainDelete, orderMoveIngridient, orderSuccess } from "../actions/main";
import { mainInitialState, mainStore } from "./main";

describe('Main reducer', () => {
  const state = mainInitialState;
  const ingridients = [
    {
      "_id": "60d3b41abdacab0026a733c7",
      "name": "Флюоресцентная булка R2-D3",
      "id": "4c5d4f3d-8d38-40f1-8a3c-c56e66b4e199",
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
      "id": "4c5d4f3d-8d38-40f1-8a3c-c56e66b4e100",
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
    },
    {
      "_id": "60d3b41abdacab0026a733c9",
      "name": "Мясо бессмертных моллюсков Protostomia",
      "id": "4c5d4f3d-8d38-40f1-8a3c-c56e66b4e099",
      "type": "main",
      "proteins": 433,
      "fat": 244,
      "carbohydrates": 33,
      "calories": 420,
      "price": 1337,
      "image": "https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
      "__v": 0,
      "counter": 0
    }
  ]

  test('Should return initial state', () => {
    // @ts-ignore
    expect(mainStore(undefined, {})).toEqual(state)
  })

  test('Get ingridient success', () => {
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
          ingridients[1]
        ],
        buns: ingridients[0]
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

  test('Order Clean', () => {
    const orderState = {
      ...state,
      order: {
        main: [
          ingridients[1]
        ],
        buns: ingridients[0]
      },
      orderPrice: 2964, 
    }

    expect(mainStore(orderState, orderClear())).toEqual(state);
  })

  test('Order main delete', () => {
    const oldState = {
      ...state,
      order: {
        ...state.order,
        main: [
          ingridients[1]
        ]
      }
    }
    expect(mainStore(oldState, orderMainDelete(ingridients[1].id))).toEqual(state);
  })

  test('Order buns change', () => {
    const orderState = {
      ...state,
      order: {
        ...state.order,
        buns: ingridients[0]
      }
    }
    expect(mainStore(state, orderBunsChange(ingridients[0]))).toEqual(orderState);
  })

  test('Order move ingridient', () => {
    const defaultState = {
      ...state,
      order: {
        ...state.order,
        main: [
          ingridients[1], ingridients[2]
        ]
      }
    }
    const movingState = {
      ...state,
      order: {
        ...state.order,
        main: [
          ingridients[2], ingridients[1]
        ]
      }
    }
    expect(mainStore(defaultState, orderMoveIngridient(1, 0))).toEqual(movingState);
  })

  test('Add modal ingridient', () => {
    const modalStore = {
      ...state,
      ingridientModal: ingridients[0]
    }

    expect(mainStore(state, addModalIngridient(ingridients[0]))).toEqual(modalStore);
  })
})
import { IOrderMessage, wsAddModalOrder, wsConnectionClosed, wsGetMessage } from "../actions/ws";
import { initialState, wsState } from "./ws"

describe('WS reducer', () => {
  const state = initialState;
  const request: IOrderMessage = {
    "orders": [
        {
          "_id": "63edca62936b17001be5e447",
          "ingredients": [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733d4",
            "60d3b41abdacab0026a733c6"
          ],
          "status": "done",
          "name": "Астероидный краторный бургер",
          "createdAt": "2023-02-16T06:17:06.338Z",
          "updatedAt": "2023-02-16T06:17:06.765Z",
          "number": 40923
        },
        {
          "_id": "63edc8aa936b17001be5e445",
          "ingredients": [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733d4",
            "60d3b41abdacab0026a733c6"
          ],
          "status": "done",
          "name": "Астероидный краторный бургер",
          "createdAt": "2023-02-16T06:09:46.826Z",
          "updatedAt": "2023-02-16T06:09:47.194Z",
          "number": 40922
        },
        {
          "_id": "63edc3c3936b17001be5e440",
          "ingredients": [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733d4",
            "60d3b41abdacab0026a733c6"
          ],
          "status": "done",
          "name": "Астероидный краторный бургер",
          "createdAt": "2023-02-16T05:48:51.198Z",
          "updatedAt": "2023-02-16T05:48:51.579Z",
          "number": 40921
        },
        {
          "_id": "63edbf7a936b17001be5e437",
          "ingredients": [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733d4",
            "60d3b41abdacab0026a733c6"
          ],
          "status": "done",
          "name": "Астероидный краторный бургер",
          "createdAt": "2023-02-16T05:30:34.677Z",
          "updatedAt": "2023-02-16T05:30:35.043Z",
          "number": 40920
        },
        {
          "_id": "63ed6fc2936b17001be5e3e1",
          "ingredients": [
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c7"
          ],
          "status": "done",
          "name": "Флюоресцентный бургер",
          "createdAt": "2023-02-15T23:50:26.169Z",
          "updatedAt": "2023-02-15T23:50:26.593Z",
          "number": 40919
        }
    ],
    "total": 40832,
    "totalToday": 68
  }

  it('WS Get message', () => {
    const readyOrder = request.orders
      .filter(el => el.status === 'done')
      .map(el => el.number)
    const waitingOrders = request.orders
      .filter(el => el.status === 'pending' || el.status === 'created')
      .map(el => el.number)
    const gettingMessageStore = {
      ...state,
      orders: request.orders,
      totalToday: request.totalToday,
      totalAll: request.total,
      readyOrders: readyOrder,
      waitingOrders: waitingOrders
    }
    expect(wsState(state, wsGetMessage(request))).toEqual(gettingMessageStore)
  })

  it('Ws connection closed', () => {
    expect(wsState(state, wsConnectionClosed())).toEqual(state)
  })

  it('Ws add modal order', () => {
    const modalState = {
      ...state,
      orderModal: request.orders[0]
    }
    expect(wsState(state, wsAddModalOrder(request.orders[0]))).toEqual(modalState)
  })
})
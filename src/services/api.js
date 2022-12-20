import checkResponce from '../utils/checkResponce';
import { BURGER_API_URL } from '../utils/constants';

export const getIngridients = async () => {
  return await fetch(`${BURGER_API_URL}/ingredients`)
    .then(checkResponce)
}

export const confirmOrder = async (ingredients) => {
  return await fetch(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(ingredients)
  })
  .then(checkResponce)
}
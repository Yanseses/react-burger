import { BURGER_API_URL } from '../utils/constants';

export const getIngridients = async () => {
  return await fetch(`${BURGER_API_URL}/ingredients`)
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    }).catch(err => {
      console.log(err);
    });
}

export const confirmOrder = async (ingredients) => {
  return await fetch(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(ingredients)
  }).then(res => {
    if(res.ok){
      return res.json();
    } else {
      throw new Error(res.status)
    }
  }).catch(err => {
    console.log(err)
  })
}
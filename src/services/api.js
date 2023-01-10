import checkResponce from '../utils/checkResponce';
import { BURGER_API_URL } from '../utils/constants';

export async function request(url, options){
  return await fetch(BURGER_API_URL + url, options).then(checkResponce)
}
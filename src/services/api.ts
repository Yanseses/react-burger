import { checkResponce } from '../utils/checkResponce';
import { BURGER_API_URL } from '../utils/constants';

export const request = async (url: string, options: RequestInit) => {
  return await fetch(BURGER_API_URL + url, options).then(checkResponce);
}
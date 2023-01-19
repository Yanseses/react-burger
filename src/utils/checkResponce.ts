type TResponse<T> = {
  success: boolean
} & T;

export const checkResponce = <T>(res: Response) => {
  return res.ok ? res.json().then(data => data as TResponse<T>) : Promise.reject(`Ошибка ${res.statusText}`)
}
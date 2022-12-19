export default function checkResponce(res){
  if(res.ok){
    return res.json()
  } else {
    return Promise.reject(`Ошибка ${res.status}`)
  }
}
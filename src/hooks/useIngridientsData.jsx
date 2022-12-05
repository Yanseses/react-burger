import { useEffect, useState } from "react";

const url = 'https://norma.nomoreparties.space/api/ingredients';

export function useIngridientsData(){
  const [ state, setState ] = useState({
    hasError: false,
    data: []
  })

  useEffect(() => {
    const data = fetch(url)
      .then(res => {
        if(res.ok){
          return res.json()
        }
        throw new Error(res.status)
      })
      .then(res => {
        if(res.success){
          setState({...state, data: res.data})
        } else {
          throw new Error('404');
        }
      })
      .catch(err => {
        setState({state: err, hasError: true})
      });
  }, []);
  
  return [ state ];
}
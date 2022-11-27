import { useEffect, useState } from "react";
import { data } from "../utils/data";

export function useIngridients(){
  const [ ingridients, setIngridients ] = useState([])

  useEffect(() => {
    setIngridients(data)
  }, []);

  return [ ingridients ];
}
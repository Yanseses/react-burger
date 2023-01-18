import { useState, ChangeEvent } from "react";
import { TUseForm } from "../services/types";

export function useForm(inputValues: TUseForm){
  const [values, setValues] = useState<TUseForm>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value})
  }

  return { values, handleChange, setValues };
}
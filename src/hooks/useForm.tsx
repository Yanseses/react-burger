import { useState, ChangeEvent } from "react";
import { TUserData } from "../services/thunks/auth";

export function useForm(inputValues: TUserData){
  const [values, setValues] = useState<TUserData>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value})
  }

  return { values, handleChange, setValues };
}
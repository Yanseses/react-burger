import { useState, ChangeEvent } from "react";
import { TUserDataNew } from "../services/thunks/auth";

export interface IHandlerError {
  name: string,
  status: boolean
}

export function useForm(inputValues: TUserDataNew){
  const [ values, setValues ] = useState<TUserDataNew>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({...values, [name]: { ...values[name], data: value }})
  }

  const handleError = ({ name, status }: IHandlerError) => {
    setValues({ ...values, [name]: { ...values[name], error: status } })
  }

  return { values, handleChange, handleError, setValues };
}
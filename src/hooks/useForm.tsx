import { useState, ChangeEvent, useCallback } from "react";
import { TUserDataNew } from "../services/thunks/auth";

export interface IHandlerError {
  name: string,
  status: boolean
}

export function useForm(inputValues: TUserDataNew){
  const [ values, setValues ] = useState<TUserDataNew>(inputValues);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({...values, [name]: { ...values[name], data: value }})
  }, [values])

  const handleError = useCallback(({ name, status }: IHandlerError) => {
    setValues({ ...values, [name]: { ...values[name], error: status } })
  }, [values])

  return { values, handleChange, handleError, setValues };
}
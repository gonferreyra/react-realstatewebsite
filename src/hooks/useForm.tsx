import { ChangeEvent, useState } from "react";

// <T> es para indicar que es de tipo generico, le indicamos que va a ser del tipo que le mandemos cuando importemos el useForm en el componente y lo vamos a reemplazar con un interface personalizado de acuerdo a los datos que necesitemos

// function useForm<T>(initialState: T) {
const useForm = <T extends Object>(initialState: T) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    formData,
    handleInputChange,
  };
};

export default useForm;

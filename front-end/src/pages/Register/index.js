import React from 'react';
import { useForm } from 'react-hook-form';
import './styles.css';

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Seu nome" {...register("nome", { required: true })} />
        <input placeholder="Noda da loja"{...register("exampleRequired", { required: true })} />
        <input type="submit" />
      </form>
    </>
  );
}

export default Register;
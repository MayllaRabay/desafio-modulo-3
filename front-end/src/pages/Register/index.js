import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

const useStyles = makeStyles({
  card: {
    background: '--color-white',
    borderRadius: 16,
    boxShadow: '0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)',
    padding: '5rem'
  }
});

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const materialStyles = useStyles();

  return (
    <div className={styles.content__wrapper}>
      <Card className={materialStyles.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Seu nome" {...register("nome", { required: true })} />
          <input placeholder="Noda da loja"{...register("exampleRequired", { required: true })} />
          <input type="submit" />
        </form>
      </Card>
    </div>
  );
}

export default Register;
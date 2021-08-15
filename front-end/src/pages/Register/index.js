import { Button, Card, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import PasswordInput from '../../components/PasswordInput';
import styles from './styles.module.scss';

const useStyles = makeStyles({
  card: {
    background: 'var(--color-white)',
    borderRadius: 16,
    boxShadow: '0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)',
    padding: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& h2': {
      marginBottom: '4rem',
      textAlign: 'center'
    }
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  row: {
    marginBottom: '2.5rem',
    width: '14rem'
  },

  button: {
    backgroundColor: 'var(--color-blue)',
    color: 'var(--color-white)',
    marginTop: '1rem',
    width: 'fit-content'
  },

  footer: {
    fontSize: '0.8rem',
    margin: '1.5rem',

    '& a': {
      color: 'var(--color-blue)'
    }
  }
});

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const materialStyles = useStyles();

  return (
    <div className={styles.content__wrapper}>
      <Card className={materialStyles.card}>
        <Typography variant="h4" component="h2">
          Criar uma conta
        </Typography>
        <form className={materialStyles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField className={materialStyles.row} label="Seu nome" {...register("nome", { required: true })} />
          <TextField className={materialStyles.row} label="Nome da loja" {...register("nome_loja", { required: true })} />
          <TextField className={materialStyles.row} label="E-mail"{...register("email", { required: true })} />
          <PasswordInput label="Senha" id="senha" {...register("senha", { required: true })} />
          <PasswordInput label="Repita a senha" id="repita_senha" {...register("repitaSenha", { required: true })} />

          <Button className={materialStyles.button} variant="contained">
            Criar Conta
          </Button>
        </form>
        <Typography className={materialStyles.footer}>
          Já possui uma conta? <a href='/'>ACESSE</a>
        </Typography>
      </Card>
    </div>
  );
}

export default Register;
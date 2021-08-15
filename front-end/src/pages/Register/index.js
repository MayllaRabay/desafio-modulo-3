import { Button, Card, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import PasswordInput from '../../components/PasswordInput/index';
import styles from './styles.module.scss';

const useStyles = makeStyles({
  card: {
    background: 'var(--color-white)',
    borderRadius: 16,
    boxShadow: '0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2.5rem',
    padding: '5rem',

    '& h2': {
      marginBottom: '3.5rem',
      textAlign: 'center'
    }
  },

  row: {
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

    '& a': {
      color: 'var(--color-blue)'
    }
  }
});

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const materialStyles = useStyles();

  function registerUser(data) {
    if(data.senha !== data.repita_senha) {
      return
    }
  }

  return (
    <form className={styles.content__wrapper} onSubmit={handleSubmit(registerUser)}>
      <Card className={materialStyles.card}>
        <Typography variant="h4" component="h2">
          Criar uma conta
        </Typography>
        <TextField 
          className={materialStyles.row} 
          label="Seu nome" 
          {...register("nome", { required: true })}
          error={!!errors.nome} // === {errors.nome ? true : false}
        />
        <TextField 
          className={materialStyles.row} 
          label="Nome da loja" 
          {...register("nome_loja", { required: true })}
          error={!!errors.nome_loja}
        />
        <TextField 
          className={materialStyles.row} 
          label="E-mail"
          {...register("email", { required: true })}
          error={!!errors.email}
        />
        <PasswordInput 
          label="Senha" 
          id="senha" 
          register={() => register("senha", { required: true })}
          error={!!errors.senha}
        />
        <PasswordInput 
          label="Repita a senha" 
          id="repita_senha" 
          register={() => register("repita_senha", { required: true })}
          error={!!errors.repita_senha}
        />
        <Button type="submit" className={materialStyles.button} variant="contained">
          Criar Conta
        </Button>
        <Typography className={materialStyles.footer}>
          Já possui uma conta? <a href='/'>ACESSE</a>
        </Typography>
      </Card>
    </form>
  );
}

export default Register;
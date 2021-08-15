import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';

const useStyles = makeStyles({
  input: {
    width: '14rem'
  }
});

function PasswordInput(props) {
  const materialStyles = useStyles();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <FormControl>
      <InputLabel 
        htmlFor={props.id}
        error={props.error}
      >
        {props.label}
      </InputLabel>
      <Input
        className={materialStyles.input}
        id={props.id} 
        type={passwordVisible ? "text" : "password"}
        error={props.error}
        {...props.register()}
        endAdornment={
          <InputAdornment position="end">
            <IconButton 
              aria-label="toggle password visibility"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        } 
      />
    </FormControl>
  );
}

export default PasswordInput;
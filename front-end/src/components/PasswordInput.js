import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { VisibilityOff } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles({
  input: {
    marginBottom: '2.5rem',
    width: '14rem'
  }
});

function PasswordInput(props) {
  const materialStyles = useStyles();
  return (
    <FormControl>
      <InputLabel htmlFor={props.id}>
        {props.label}
      </InputLabel>
      <Input
        className={materialStyles.input}
        id={props} 
        type="password" 
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility">
              <VisibilityOff />
            </IconButton>
          </InputAdornment>
        } 
      />
    </FormControl>
  );
}

export default PasswordInput;
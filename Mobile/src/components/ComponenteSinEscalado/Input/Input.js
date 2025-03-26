import React from 'react';
import { Input as NBInput } from 'native-base';

export const Input = (props) => {
  return <NBInput {...props} allowFontScaling={false}>{props.children}</NBInput>
}
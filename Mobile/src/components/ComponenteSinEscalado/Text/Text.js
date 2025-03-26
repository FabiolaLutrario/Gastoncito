import React from 'react';
import { Text as NBText } from 'native-base';
import { Pressable } from 'react-native';
import { COLORS } from '../../../styles/colors';

export const MyTextXL = (props) => {
  return <NBText {...props} fontSize={20} allowFontScaling={true}>{props.children}</NBText>
}

export const MyTextLG = (props) => {
  return <NBText {...props} fontSize={18} allowFontScaling={true}>{props.children}</NBText>
}

export const MyTextMD= (props) => {
  return <NBText {...props} fontSize={16} allowFontScaling={true}>{props.children}</NBText>
}

export const MyTextSM = (props) => {
  return <NBText {...props} fontSize={14} allowFontScaling={true}>{props.children}</NBText>
}

export const MyTextAPL = ({ onPress, children, ...props }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? COLORS.disabled : 'transparent',
      })}
    >
      <NBText {...props} fontSize={14} allowFontScaling={true}>
        {children}
      </NBText>
    </Pressable>
  );
};
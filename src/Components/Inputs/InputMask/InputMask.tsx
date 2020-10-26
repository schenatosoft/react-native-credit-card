import React, {FC, useState, useCallback, useRef} from 'react';
import {Container, PlaceholderLabel, LabeledInput} from './../Styles';
import {TextInputMask, TextInputMaskProps} from 'react-native-masked-text';
import {TextInput} from 'react-native';

interface InputProps extends TextInputMaskProps {
  fullLine?: boolean;
}

interface InputReference extends TextInputMaskProps {
  value: string;
}

const InputMask: FC<InputProps> = ({
  placeholder,
  fullLine,
  children,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<InputReference>(null);
  const [isFilled, setIsFilled] = useState(
    inputRef && inputRef.current ? !!inputRef.current.value : false,
  );

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    if (inputRef.current) setIsFilled(!!inputRef.current.value);
  }, []);
  const isTextField =
    rest.type === 'custom' && (!rest.options || !rest.options.mask);

  const handleChangeText = useCallback((text, rawText) => {
    if (inputRef.current) inputRef.current.value = text;
    setIsFilled(!!text);
    rest.onChangeText && rest.onChangeText(text, rawText);
  }, []);

  return (
    <Container fullLine={fullLine || false}>
      <PlaceholderLabel
        isFocused={isFocused}
        isFilled={isFilled}
        onPress={() => setIsFocused(!isFocused)}>
        {placeholder}
      </PlaceholderLabel>
      {!isTextField && (
        <TextInputMask
          {...(rest as any)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={handleChangeText}
        />
      )}
      {isTextField && (
        <TextInput
          {...(rest as any)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={handleChangeText}
        />
      )}
    </Container>
  );
};

export default InputMask;

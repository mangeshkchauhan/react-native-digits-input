import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View, ViewProps, StyleSheet } from 'react-native';

export interface DigitsInputProps extends ViewProps {
  /**
   * Number of digits to be displayed
   */
  numberOfDigits?: number;

  /**
   * Callback function triggered when the input code changes (text: string) => void
   */
  onCodeChange?: (text: string) => void;

  /**
   * Disables the input field
   */
  disabled?: boolean;

  /**
   * Style for the number container
   */
  numberContainerStyle?: ViewProps['style'];

  /**
   * Style for the outer container
   */
  containerStyle?: ViewProps['style'];
}

const DigitsInput: React.FC<DigitsInputProps> = ({
  onCodeChange,
  disabled,
  numberContainerStyle,
  numberOfDigits = 4,
}) => {
  const [input, setInput] = useState<string>('');
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const inputRef = inputRefs.current[input.length + 1];
    if (input && onCodeChange) onCodeChange(input);
    if (input.length === numberOfDigits) {
      const newInputRef = inputRefs.current[input.length];
      newInputRef?.blur();
    } else if (inputRef) {
      inputRef.focus();
    }
  }, [input, onCodeChange, numberOfDigits]);

  const handleOnFocus = (index: number) => {
    let pointer = input.length;
    if (pointer > index) {
      inputRefs.current[index]?.blur();
      inputRefs.current[
        pointer === numberOfDigits ? pointer : pointer + 1
      ]?.focus();
    } else if (pointer < index) {
      inputRefs.current[pointer === 0 ? 1 : pointer + 1]?.focus();
    }
  };

  const handleChangeText = (text: string) => {
    if (text.length === numberOfDigits) {
      const inp = text.split('');
      inp.forEach((t, i) => {
        const inputRef = inputRefs.current[i + 1];
        inputRef?.setNativeProps({ text: t });
      });
      inputRefs.current[1]?.blur();
      setInput(text);
    } else if (input.length < numberOfDigits) {
      setInput((prevInput) => prevInput + text);
    }
  };

  const renderInputBox = (index: number) => {
    return (
      <TextInput
        autoComplete='sms-otp'
        textContentType='oneTimeCode'
        style={[styles.numberContainer, numberContainerStyle]}
        value={input[index]}
        maxLength={numberOfDigits}
        key={index}
        editable={!disabled}
        keyboardType='number-pad'
        onChangeText={handleChangeText}
        onFocus={() => handleOnFocus(index)}
        underlineColorAndroid='transparent'
        selectionColor={'gray'}
        ref={(ref) => (inputRefs.current[index + 1] = ref)}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Backspace') {
            setInput((prevInput) => {
              return prevInput.slice(0, -1);
            });
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: numberOfDigits }, (_, i) => renderInputBox(i))}
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    height: 48,
    width: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    marginRight: 8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DigitsInput;

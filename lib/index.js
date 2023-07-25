import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import styles from './styles';
const DigitsInput = ({ onCodeChange, disabled, numberContainerStyle, numberOfDigits = 4, }) => {
    const [input, setInput] = useState('');
    const inputRefs = useRef([]);
    useEffect(() => {
        const inputRef = inputRefs.current[input.length + 1];
        if (input && onCodeChange)
            onCodeChange(input);
        if (input.length === numberOfDigits) {
            const newInputRef = inputRefs.current[input.length];
            newInputRef === null || newInputRef === void 0 ? void 0 : newInputRef.blur();
        }
        else if (inputRef) {
            inputRef.focus();
        }
    }, [input, onCodeChange, numberOfDigits]);
    const handleOnFocus = (index) => {
        var _a, _b, _c;
        let pointer = input.length;
        if (pointer > index) {
            (_a = inputRefs.current[index]) === null || _a === void 0 ? void 0 : _a.blur();
            (_b = inputRefs.current[pointer === numberOfDigits ? pointer : pointer + 1]) === null || _b === void 0 ? void 0 : _b.focus();
        }
        else if (pointer < index) {
            (_c = inputRefs.current[pointer === 0 ? 1 : pointer + 1]) === null || _c === void 0 ? void 0 : _c.focus();
        }
    };
    const handleChangeText = (text) => {
        var _a;
        if (text.length === numberOfDigits) {
            const inp = text.split('');
            inp.forEach((t, i) => {
                const inputRef = inputRefs.current[i + 1];
                inputRef === null || inputRef === void 0 ? void 0 : inputRef.setNativeProps({ text: t });
            });
            (_a = inputRefs.current[1]) === null || _a === void 0 ? void 0 : _a.blur();
            setInput(text);
        }
        else if (input.length < numberOfDigits) {
            setInput((prevInput) => prevInput + text);
        }
    };
    const renderInputBox = (index) => {
        return (<TextInput autoComplete='sms-otp' textContentType='oneTimeCode' style={[styles.numberContainer, numberContainerStyle]} value={input[index]} maxLength={numberOfDigits} key={index} editable={!disabled} keyboardType='number-pad' onChangeText={handleChangeText} onFocus={() => handleOnFocus(index)} underlineColorAndroid='transparent' selectionColor={'gray'} ref={(ref) => (inputRefs.current[index + 1] = ref)} onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                    setInput((prevInput) => {
                        return prevInput.slice(0, -1);
                    });
                }
            }}/>);
    };
    return (<View style={styles.container}>
      {Array.from({ length: numberOfDigits }, (_, i) => renderInputBox(i))}
    </View>);
};
export default DigitsInput;

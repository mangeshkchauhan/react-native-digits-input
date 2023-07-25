import React from 'react';
import { ViewProps } from 'react-native';
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
declare const DigitsInput: React.FC<DigitsInputProps>;
export default DigitsInput;

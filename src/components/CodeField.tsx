import React, { memo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {
  CodeField as CodeFieldComponent,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

export type CodeFieldProps = {
  onChangeValue: (value: string) => void;
  hasError?: boolean;
  errorMessage?: string;
};

const CodeField = ({ onChangeValue, hasError = false, errorMessage = '' }: CodeFieldProps) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const errorStyle = () => {
    return hasError ? { borderColor: 'red', color: 'red' } : null
  }

  return (
    <View>
      <CodeFieldComponent
        ref={ref}
        {...props}
        value={value}
        onChangeText={(text) => {
          onChangeValue(text);
          setValue(text);
        }}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            style={[styles.text, errorStyle()]}
            key={index}
            // isFocused={isFocused}
            // hasError={hasError}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {hasError && (
        <View>
          <Text style={styles.error}>
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    width: 40,
    height: 56,
    textAlign: 'center',
    lineHeight: 16,
    fontSize: 16,
    color: '#03110b',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
    paddingVertical: 22,
  },
  error: {
    color: 'red'
  },
});

export default memo(CodeField);
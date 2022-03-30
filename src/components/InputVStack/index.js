import React from 'react';
import {VStack, Text, Input, TextArea, FormControl, Divider} from 'native-base';

const InputVStack = props => {
  const {formControl, label, input, textArea, errorMsg, showDivider, labelText} = props;

  return (
    <>
      <FormControl {...formControl}>
        <VStack flex="1">
          {label && (
            <FormControl.Label mb="0">
              <Text color="#808080" fontSize={14} {...labelText}>
                {label}
              </Text>
            </FormControl.Label>
          )}
          {input && (
            <Input
              color="black"
              borderWidth="0"
              pl="0"
              placeholderTextColor={'#808080'}
              fontSize={18}
              {...input}
            />
          )}
          {textArea && <TextArea color="grey.900" borderBottomWidth="0" pl="0" {...textArea} />}
          <FormControl.ErrorMessage>{errorMsg}</FormControl.ErrorMessage>
        </VStack>
      </FormControl>
      {showDivider || (!input.isDisabled && <Divider background="#808080" />)}
    </>
  );
};

export default InputVStack;

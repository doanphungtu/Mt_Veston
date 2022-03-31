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
              background="white"
              {...input}
            />
          )}
          {textArea && <TextArea color="grey.900" borderBottomWidth="0" pl="0" {...textArea} />}
        </VStack>
        {(showDivider || !input?.isDisabled) && <Divider background="#808080" />}
        <FormControl.ErrorMessage>{errorMsg}</FormControl.ErrorMessage>
      </FormControl>
    </>
  );
};

export default InputVStack;

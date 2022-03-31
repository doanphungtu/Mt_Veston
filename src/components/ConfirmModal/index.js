import React from 'react';

import {Button, Divider, HStack, Modal, Text} from 'native-base';

const ConfirmModal = props => {
  const {
    isOpen,
    onClose,
    onConfirm,
    confirmTitle,
    confirmMessage,
    confirmBtnLabel,
    cancelBtnLabel,
    confirmBtnStyle,
    cancelBtnStyle,
    hideConfirmButton,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="300px">
        <Modal.CloseButton color="black" />
        <Modal.Header _text={{fontWeight: 'bold', fontSize: 18}} color="black">
          {confirmTitle || 'Thông báo'}
        </Modal.Header>
        <Modal.Body>
          <Text fontSize={18} fontWeight="400">
            {confirmMessage}
          </Text>
        </Modal.Body>
        <Divider />
        <Modal.Footer py="2">
          <HStack>
            <Button
              bgColor="#EFEFEF"
              bg="#F3F4F6"
              onPress={onClose}
              {...cancelBtnStyle}
              _text={{
                fontWeight: 'bold',
                color: '#808080',
                fontSize: 18,
              }}
              mr="3">
              {cancelBtnLabel || 'Huỷ'}
            </Button>
            {!hideConfirmButton && (
              <Button
                bgColor="blue.100"
                bg="#0A52A8"
                onPress={onConfirm}
                _text={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 18,
                }}
                {...confirmBtnStyle}>
                {confirmBtnLabel || 'Ok'}
              </Button>
            )}
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmModal;

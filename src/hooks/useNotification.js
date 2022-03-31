import {useToast} from 'native-base';

export const useNotification = () => {
  const toast = useToast();

  const showErrorNotification = (message, id, options) => {
    if (!toast.isActive(id)) {
      toast.show({
        id,
        placement: 'top',
        status: 'error',
        title: 'Lỗi',
        description: message,
        isClosable: true,
        ...options,
      });
    }
  };

  const showSuccessNotification = (message, id, options) => {
    if (!toast.isActive(id)) {
      toast.show({
        id,
        placement: 'top',
        status: 'success',
        title: 'Thành công',
        isClosable: true,
        description: message,
        ...options,
      });
    }
  };

  return {
    showErrorNotification,
    showSuccessNotification,
  };
};

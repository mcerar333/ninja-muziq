import getUser from '../composables/getUser';

import { storage } from '../firebase/config';
import { ref } from 'vue';

const user = getUser();

const useStorage = () => {
  const storageError = ref(null);
  const filePath = ref(null);
  const fileUrl = ref(null);

  const uploadFile = async file => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = storage.ref(filePath.value);
    storageError.value = null;

    try {
      const res = await storageRef.put(file);

      if (res.state !== 'success')
        throw Error('Error during the file upload...');

      fileUrl.value = await res.ref.getDownloadURL();

      return res;
    } catch (err) {
      storageError.value = err.message;
    }
  };

  const deleteFile = async filePath => {
    const storageRef = storage.ref(filePath);
    storageError.value = null;

    try {
      await storageRef.delete();
    } catch (err) {
      storageError.value = err.message;
    }
  };

  return { storageError, filePath, fileUrl, uploadFile, deleteFile };
};

export default useStorage;

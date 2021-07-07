import { db } from '../firebase/config';
import { ref } from 'vue';

const useDocument = (collection, docId) => {
  const useError = ref(null);
  const pending = ref(false);

  const documentRef = db.collection(collection).doc(docId);

  const deleteDoc = async () => {
    useError.value = null;
    pending.value = true;

    try {
      await documentRef.delete();
      pending.value = false;
    } catch (err) {
      useError.value = err.message;
      pending.value = false;
    }
  };

  const updateDoc = async updates => {
    useError.value = null;
    pending.value = true;

    try {
      await documentRef.update(updates);

      pending.value = false;
    } catch (err) {
      useError.value = err.message;
      pending.value = false;
    }
  };

  return { useError, pending, deleteDoc, updateDoc };
};

export default useDocument;

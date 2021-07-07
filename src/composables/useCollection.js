import { db } from '../firebase/config';
import { ref } from 'vue';

const useCollection = collection => {
  const error = ref(null);
  const pending = ref(false);

  const addDoc = async doc => {
    error.value = null;
    pending.value = true;

    try {
      const res = await db.collection(collection).add(doc);

      if (!res.id) throw Error('Error writing to database...');

      pending.value = false;

      return res;
    } catch (err) {
      error.value = err.message;
      pending.value = false;
    }
  };

  return { pending, error, addDoc };
};

export default useCollection;

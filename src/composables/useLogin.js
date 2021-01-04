import { auth } from '../firebase/config';
import { ref } from 'vue';

const error = ref(null);
const pending = ref(false);

const login = async (email, password) => {
  error.value = null;
  pending.value = true;

  try {
    const res = await auth.signInWithEmailAndPassword(email, password);

    if (!res) throw Error('Could not complete the Login process...');

    pending.value = false;

    return res;
  } catch (err) {
    error.value = err.message;
    pending.value = false;
  }
};

const useLogin = () => {
  return { pending, error, login };
};

export default useLogin;

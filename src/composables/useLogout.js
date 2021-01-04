import { auth } from '../firebase/config';
import { ref } from 'vue';

const error = ref(null);
const pending = ref(false);

const logout = async () => {
  error.value = null;
  pending.value = true;

  try {
    await auth.signOut();

    pending.value = false;
  } catch (err) {
    error.value = err.message;
    pending.value = false;
  }
};

const useLogout = () => {
  return { pending, error, logout };
};

export default useLogout;

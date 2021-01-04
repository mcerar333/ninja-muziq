import { auth } from '../firebase/config';
import { ref } from 'vue';

const error = ref(null);
const pending = ref(false);

const signup = async (nickname, email, password) => {
  error.value = null;
  pending.value = true;

  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);

    if (!res) throw Error('Could not finish the Signup process...');

    await res.user.updateProfile({ displayName: nickname });

    pending.value = false;

    return res;
  } catch (err) {
    error.value = err.message;
    pending.value = false;
  }
};

const useSignup = () => {
  return { pending, error, signup };
};

export default useSignup;

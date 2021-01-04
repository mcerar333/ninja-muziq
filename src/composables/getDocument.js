import { db } from '../firebase/config';
import { watchEffect, ref } from 'vue';

const getDocument = (collection, docId) => {
  const getError = ref(null);
  const document = ref(null);

  const documentRef = db.collection(collection).doc(docId);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      getError.value = null;

      if (doc.exists) {
        document.value = doc.data().createdAt && {
          id: doc.id,
          ...doc.data(),
        };
      } else {
        setTimeout(() => {
          getError.value = 'This document does not exist...';
        }, 500);
      }
    },
    (err) => {
      document.value = null;
      getError.value = err.message;
    }
  );

  // Unsub from Real Time Listener
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { getError, document };
};

export default getDocument;

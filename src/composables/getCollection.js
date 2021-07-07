import { db } from '../firebase/config';
import { watchEffect, ref } from 'vue';

const getCollection = (collection, query) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = db.collection(collection).orderBy('createdAt');

  if (query) collectionRef = collectionRef.where(...query);

  const unsub = collectionRef.onSnapshot(
    snap => {
      error.value = null;
      let results = [];

      snap.docs.forEach(doc => {
        doc.data().createdAt && results.unshift({ id: doc.id, ...doc.data() });
      });

      documents.value = results;
    },
    err => {
      documents.value = null;
      error.value = err.message;
    }
  );

  // Unsub from Real Time Listener Updates on Component Destruction
  watchEffect(onInvalidate => {
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;

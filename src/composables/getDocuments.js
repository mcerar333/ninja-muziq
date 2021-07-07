import { db } from '../firebase/config';
import { ref } from 'vue';

const getDocuments = collection => {
  const pending = ref(false);
  const getError = ref(null);
  const documents = ref(null);
  const latestDoc = ref(null);
  const hasReachedEnd = ref(false);

  const getResults = async documentsRef => {
    const data = await documentsRef.get();

    if (!data) throw Error('Error retrieving documents...');
    if (data.empty) hasReachedEnd.value = true;

    const results = data.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    latestDoc.value = data.docs[data.docs.length - 1];

    return results;
  };

  const initialFetch = async limit => {
    const documentsRef = db
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .limit(limit);

    getError.value = null;
    pending.value = true;

    try {
      const results = await getResults(documentsRef);

      documents.value = results;
      pending.value = false;
    } catch (err) {
      documents.value = null;
      getError.value = err.message;
      pending.value = false;
    }
  };

  const fetchMore = async limit => {
    if (hasReachedEnd.value) return;

    const documentsRef = db
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .startAfter(latestDoc.value || 0)
      .limit(limit);

    getError.value = null;
    pending.value = true;

    try {
      const results = await getResults(documentsRef);

      documents.value = [...documents.value, ...results];
      pending.value = false;
    } catch (err) {
      getError.value = err.message;
      pending.value = false;
    }
  };

  return {
    pending,
    getError,
    documents,
    initialFetch,
    fetchMore,
  };
};

export default getDocuments;

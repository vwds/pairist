import { useEffect, useState } from 'react';
import { AuthActions } from '../actions/firebase';

export const useSession = () => {
  const currentUser = AuthActions.fetchUser();

  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState(currentUser?.uid || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoUrl || '');

  useEffect(() => {

    const unsubscribe = AuthActions.onAuthStateChanged((user) => {
      setLoaded(true);

      if (user) {
        setDisplayName(user.displayName || '');
        setUserId(user.uid || '');
        setPhotoURL(user.photoUrl || '');
        return;
      }

      setDisplayName('');
      setUserId('');
      setPhotoURL('');
    });

    return unsubscribe;
  }, []);

  return {
    loaded,
    setLoaded,
    email,
    setEmail,
    displayName,
    setDisplayName,
    userId,
    setUserId,
    photoURL,
    setPhotoURL,
  };
};

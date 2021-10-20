import { auth, funcs, db } from '../firebase';
import UserActions from '../ports/user-actions';

const updateUserProfileFunc = funcs.httpsCallable('updateUserProfile');

async function logIn(email: string, password: string): Promise<void> {
  await auth.signInWithEmailAndPassword(email, password);
}

async function signUp(email: string, displayName: string, password: string): Promise<void> {
  const credential = await auth.createUserWithEmailAndPassword(email, password);

  if (credential) {
    credential.user?.updateProfile({ displayName })
    credential.user?.sendEmailVerification();
  }
}

async function resetPassword(email: string): Promise<void> {
  if (!email) return;
  await auth.sendPasswordResetEmail(email);
}

async function updateProfile(profile: { displayName?: string; photoURL?: string }, additionalOptions: { identiconString?: string, theme?: string }): Promise<void> {
  if (!auth.currentUser) return;
  await updateUserProfileFunc(profile);
  await db.collection('additionalUserInfo').doc(auth.currentUser.uid).set(
    additionalOptions,
    { merge: true }
  );
}

async function logOut(): Promise<void> {
  await auth.signOut();
}

const FirebaseUserActions: UserActions = ({
  logIn,
  signUp,
  resetPassword,
  updateProfile,
  logOut
})

export default FirebaseUserActions
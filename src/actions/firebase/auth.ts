import { auth, db } from "../../firebase";
import AuthActions, { UserAction } from "../../ports/auth-actions";

const unverified = () => Boolean(auth.currentUser && !auth.currentUser.emailVerified);

const unsubscribe = (userId: string) => db
    .collection('userRefresh')
    .doc(userId)
    .onSnapshot(async () => {
        await auth.currentUser?.reload();
        auth.currentUser?.getIdToken(true);
    });

const fetchUser = () => ({
    uid: auth.currentUser?.uid,
    email: auth.currentUser?.email,
    displayName: auth.currentUser?.displayName,
    photoUrl: auth.currentUser?.photoURL,
})

const onAuthStateChanged = (userAction: UserAction) => {
    auth.onAuthStateChanged((firebaseUser) => {
        const user = {
            uid: firebaseUser?.uid,
            email: firebaseUser?.email,
            displayName: firebaseUser?.displayName,
            photoUrl: firebaseUser?.photoURL
        }
        userAction(user)
    })
}

const FirebaseAuthActions: AuthActions = ({
    unverified,
    unsubscribe,
    fetchUser,
    onAuthStateChanged
})

export default FirebaseAuthActions
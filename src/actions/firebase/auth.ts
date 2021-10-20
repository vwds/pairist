import { auth, db } from "../../firebase";
import AuthActions from "../../ports/auth-actions";

const unverified = () => Boolean(auth.currentUser && !auth.currentUser.emailVerified);

const unsubscribe = (userId: string) => db
    .collection('userRefresh')
    .doc(userId)
    .onSnapshot(async () => {
        await auth.currentUser?.reload();
        auth.currentUser?.getIdToken(true);
    });

const FirebaseAuthActions: AuthActions = ({
    unverified,
    unsubscribe
})

export default FirebaseAuthActions
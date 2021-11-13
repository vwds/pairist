import { User } from "../types";

export type UserAction = (user: User) => void
export default interface AuthActions {
    unverified(): boolean
    unsubscribe(userId: string): void
    fetchUser(): User
    onAuthStateChanged(userAction: (user: User) => void): void
}
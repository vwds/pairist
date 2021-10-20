export default interface AuthActions {
    unverified(): boolean
    unsubscribe(userId: string): void
}
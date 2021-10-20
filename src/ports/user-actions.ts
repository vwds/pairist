export type Profile = {
    displayName?: string;
    photoURL?: string;
}
export type AdditionalOptions = {
    identiconString?: string;
    theme?: string;
}

export default interface UserActions {
    logIn(email: string, password: string): Promise<void>
    signUp(email: string, displayName: string, password: string): Promise<void>
    resetPassword(email: string): Promise<void>
    updateProfile(profile: Profile, additionalOptions: AdditionalOptions): Promise<void>
    logOut(): Promise<void> 
}
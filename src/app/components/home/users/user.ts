export interface IUser {
    id: number;
    username: String;
    role: String;
    profile: IUserProfile;
}

export interface IUserProfile {
    userId: number;
    first_name: String;
    last_name: String;
    picture_url: String;
}

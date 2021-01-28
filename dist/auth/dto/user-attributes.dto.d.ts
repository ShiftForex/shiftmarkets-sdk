export interface UserAttribute {
    name: string;
    value: string | number;
}
export interface UserAttributesDto {
    listUserAttributes: UserAttribute[];
}

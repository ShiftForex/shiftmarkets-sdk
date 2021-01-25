const randomString = () => Math.random().toString(36).substring(2, 15);

export const identificator = () => `${randomString()}${randomString()}`;

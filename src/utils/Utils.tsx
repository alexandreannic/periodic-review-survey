export const generateId = () => ('' + Math.random()).split('.')[1]

export type ValueOf<T> = T[keyof T];

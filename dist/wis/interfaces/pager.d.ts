export interface Pager<T> {
    items: T[];
    total: number;
    offset: number;
    limit: number;
}

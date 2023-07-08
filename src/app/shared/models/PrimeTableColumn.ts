export interface PrimeTableColumn<T> {
    key: keyof T;
    header: string;
}
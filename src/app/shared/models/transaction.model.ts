export interface Transaction {
    id?: number;
    userId: number;
    walletId: number;
    amount?: number;
    categoryId: number;
    notes: string;
    dateTime?: Date | string | number;
    currency: string;
}

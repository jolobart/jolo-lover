export interface Transaction {
    id?: number;
    userId: number;
    walletId: number;
    amount: number;
    category: number;
    notes: string;
    dateTime: string;
}

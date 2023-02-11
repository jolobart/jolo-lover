export interface Wallet {
    id?: number;
    userId: number;
    name: string;
    balance?: number;
    currency: string;
}

export interface SelectWalletRequest {
    walletId: number;
    userId?: number;
}

export interface RemoveWalletRequest {
    id: number;
    userId?: number;
}

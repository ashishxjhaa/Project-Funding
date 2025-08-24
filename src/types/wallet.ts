export type Transaction = {
    type: "credit" | "debit";
    amount: number;
    status: "Success" | "Failed";
    createdAt?: Date;
};

export type WalletType = {
    user: string;
    balance: number;
    transactions: Transaction[];
};

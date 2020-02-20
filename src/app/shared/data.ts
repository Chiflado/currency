export interface GetCurrenciesResponse {
    base: string;
    date: string;
    rates: any;
}

export interface SumTableData {
    amount: string;
    currency: string;
    converted: number;
}

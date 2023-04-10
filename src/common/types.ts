export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  customerId?: string;
}


export interface Customer {
  id: string;
  name: string;
  email: string;
}

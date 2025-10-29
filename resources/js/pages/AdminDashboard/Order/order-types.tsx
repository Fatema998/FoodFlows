export interface Order {
  id: number;
  invoice_id: string;
  total_amount: number;
  order_status: string;
  created_at: string;
  shipping?: {
    name: string;
    email: string;
    phone: string;
  };
}

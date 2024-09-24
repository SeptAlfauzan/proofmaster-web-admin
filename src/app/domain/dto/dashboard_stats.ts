export interface Datum {
  title: string;
  total: number;
  link: string;
  label: string;
}

export interface DashboardStats {
  data: Datum[];
}

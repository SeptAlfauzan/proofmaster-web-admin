export interface Activities {
  data: Data;
}

export interface Data {
  activities: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  pdf_url: string;
}

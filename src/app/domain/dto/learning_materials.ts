export interface LearningMaterials {
  data: Datum[];
}

export interface Datum {
  id: string;
  title: string;
  description: string;
  ic_url: string;
  pdf_url: string;
}

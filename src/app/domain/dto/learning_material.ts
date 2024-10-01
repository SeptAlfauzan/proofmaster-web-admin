export interface LearningMaterial {
  data: Data;
}

export interface Data {
  id: string;
  title: string;
  description: string;
  ic_url: string;
  pdf_url: string;
}

export interface Students {
  data: Data;
}

export interface Data {
  students: Student[];
}

export interface Student {
  id: string;
  name: string;
}

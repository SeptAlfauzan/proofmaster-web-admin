export interface Students {
  data: Data;
}

export interface Data {
  students: Student[];
}

export interface Student {
  id: string;
  photo_url: string;
  name: string;
  email: string;
  nim: string;
}

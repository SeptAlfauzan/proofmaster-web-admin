export interface Teachers {
  data: Data;
}

export interface Data {
  teachers: Teachers[];
}

export interface Teacher {
  id: string;
  photo_url: string;
  name: string;
  email: string;
}

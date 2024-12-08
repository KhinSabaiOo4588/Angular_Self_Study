// import { Employee } from "../../services/project-service/project-models";

/* <!-- Thin Thin Oo --> */
export interface Department {
  id?: string;
  name: string;
  title: string;
  location: string;
  status: string;
  description: string;
  canAccessData: boolean;
  employees?: Employee[];
}

export interface Employee {
  id: string;
  name: string;
  jobPosition: string;
  email: string;
  workPhone: string;
  workMobile: string;
  dob: string;
  gender: string;
  address: string;
  education: string;
  departmentId: string;
  salary: number;
  status: string;
}

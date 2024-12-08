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
  profileImage: string;
  password: string;
  confirmPassword: string;
}

export interface Department {
  id?: string;
  name: string;
  title: string;
  location: string;
  status: string;
  description: string;
  canAccessData: boolean;
}


/**Author By Khin Sabai Oo */
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
  profileImage: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface Department {
  id?: string;
  name: string;
}

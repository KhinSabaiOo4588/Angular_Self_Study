/* moeminoo */

export interface Employee {
  id?: number;
  name: string;
  jobPosition: string;
}

export interface Project {
  id?: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: string;
  status: string;
  employees: Employee[];
  progress: number;
  milestones: string;
  deadline: string;
  assignmentDate: string;
}

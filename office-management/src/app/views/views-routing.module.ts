import { MeetingListComponent } from './meeting-management/meeting-list/meeting-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewsComponent } from './views.component';
import { authGuard } from '../services/auth-guard/guard/auth.guard';



// Reouting

export const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent),
            canActivate: [authGuard]
          },
          {
            path: 'department',
            loadComponent: () =>
              import('./department-management/department-list/department-list.component').then(mod => mod.DepartmentListComponent),
            canActivate: [authGuard]
          },
          {
            path: 'department/department-add',
            loadComponent: () =>
              import('./department-management/department-add/department-add.component').then(mod => mod.DepartmentAddComponent),
            canActivate: [authGuard]
          },
          
          {
            path: 'department/department-view/:id/:mode',
            loadComponent: () =>
              import('./department-management/department-view/department-view.component').then(mod => mod.ViewDepartmentComponent),
            canActivate: [authGuard]
          }
          ,
          {
            path: 'project',
            loadChildren: () =>
              import('./project-management/project-list/project.module').then(mod => mod.ProjectModule),
            canActivate: [authGuard]
          },
          {
            path: 'resource',
            loadChildren: () =>
              import('./resource-management/resource-booking/resource.module').then(mod => mod.ResourceModule),
            canActivate: [authGuard]
          },
          {
            path: 'aboutUs',
            loadComponent: () =>
              import('./about-us/about-us.component').then(mod => mod.AboutUsComponent),
            canActivate: [authGuard]
          },
          {
            path: 'profile',
            loadComponent: () => import('./profile/profile.component').then(mod => mod.ProfileComponent),
            canActivate: [authGuard]
          },
          {
            path: 'attendance',
            loadComponent: () => import('./attendance-system/attendance/attendance.component').then(mod => mod.AttendanceComponent),
            canActivate: [authGuard]
          },
          {
            path: 'employee',
            loadComponent: () =>
              import('./employee-management/employee-list/employee-list.component').then(mod => mod.EmployeeListComponent),
            canActivate: [authGuard]
          },        
          {
            path: 'employee/create',
            loadComponent: () =>
              import('./employee-management/employee-create/employee-create.component').then(mod => mod.EmployeeCreateComponent),
            canActivate: [authGuard]
          },
          {
            path: 'employee/view/:id',
            loadComponent: () =>
              import('./employee-management/employee-view/employee-view.component').then(mod => mod.EmployeeViewComponent),
            canActivate: [authGuard]
          },
          {
            path: 'employee/edit/:id',
            loadComponent: () =>
              import('./employee-management/employee-edit/employee-edit.component').then(mod => mod.EmployeeEditComponent),
            canActivate: [authGuard]
          },
          {
            path: 'meeting/create-meeting',
            loadComponent: () =>
              import(
                './meeting-management/create-meeting/create-meeting.component'
              ).then((crd) => crd.CreateMeetingComponent),
            canActivate: [authGuard]
          },
          {
            path: 'meeting/update-meeting/:id',
            loadComponent: () =>
              import(
                './meeting-management/update-meeting/update-meeting.component'
              ).then((mod) => mod.UpdateMeetingComponent),
            canActivate: [authGuard]
          },
          {
            path: 'meeting/meeting-with-calendar',
            loadComponent: () =>
              import(
                './meeting-management/meeting-with-calendar/meeting-with-calendar.component'
              ).then((mwc) => mwc.MeetingWithCalendarComponent),
            canActivate: [authGuard]
          },
          {
            path: 'meeting/create-meeting',
            loadComponent: () =>
              import(
                './meeting-management/create-meeting/create-meeting.component'
              ).then((crd) => crd.CreateMeetingComponent),
            canActivate: [authGuard]
          },
          {
            path: 'meeting/update-meeting/:id',
            loadComponent: () =>
              import(
                './meeting-management/update-meeting/update-meeting.component'
              ).then((mod) => mod.UpdateMeetingComponent),
            canActivate: [authGuard]
          },
          {
            path: 'meeting/meeting-with-calendar',
            loadComponent: () =>
              import(
                './meeting-management/meeting-with-calendar/meeting-with-calendar.component'
              ).then((mwc) => mwc.MeetingWithCalendarComponent),
            canActivate: [authGuard]
          },
          {
            path: 'meeting',
           loadChildren: () => import('./meeting-management/meeting-list/meeting-list.module').then((mod) => mod.MeetingListModule),
            canActivate: [authGuard]
          }
        ],
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('../errors/errors.component').then(mod => mod.ErrorsComponent)
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}

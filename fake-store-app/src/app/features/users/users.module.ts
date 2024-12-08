import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';

import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@NgModule({
  declarations: [
    UserListComponent,
    AddUserComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule, 
  ],
})
export class UsersModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    UserTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }

import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  public edit: boolean = false;

  public user: User = {
    name: '',
    id: 0,
    email: '',
    password: '',
    roles: '',
  };

  constructor(private service: UserService) {}

  public getUsersByName() {
    this.service.getUsersByName(this.user.name);
  }
}

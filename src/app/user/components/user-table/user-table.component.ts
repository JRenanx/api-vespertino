import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  
  public users!: User[];

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.users = data;
    });
  }

  public selectUser(user: User) {
    let newUser = {...user};
    this.service.selectUser(newUser);
  }

  public delete(user: User) {
    this.service.delete(user).subscribe(() => {
      this.service.listAll().subscribe((data) => (this.users = data));
    });
  }
}

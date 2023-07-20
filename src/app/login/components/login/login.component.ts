import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public login = {} as Login;

  constructor(private service: LoginService) {}

  ngOnInit(): void {}

  loginButton(): void {
    if (this.login.email && this.login.password) {
      this.service.getToken(this.login.email, this.login.password);
    }
  }
}
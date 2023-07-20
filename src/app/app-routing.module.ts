import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { UserComponent } from './user/components/user/user.component';
import { CountryComponent } from './country/components/country/country.component';
import { TrackComponent } from './track/components/track/track.component';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/components/login/login.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "users", component: UserComponent },
  { path: "countrys", component: CountryComponent },
  { path: "tracks", component: TrackComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

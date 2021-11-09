import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { SigninComponent } from './signin/signin.component';
import { LoginGuard } from "./login.guard";

const routes: Routes = [
  { path: 'user_manager', component: UserManagerComponent, canActivate: [LoginGuard] },
  { path: '', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ZippassComponent } from './zippass/zippass.component'; 
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoggedInService } from './logged-in.service';
import { GuardLoginService } from './guard-login.service';
import { RegisterComponent } from './register/register.component';
import { QuestionRegisterComponent } from './question-register/question-register.component';


const routes: Routes = [
  {path:'',component:LeaderboardComponent},
  {path:'add-team',component:RegisterComponent,canActivate:[LoggedInService]},
  {path:'add-question',component:QuestionRegisterComponent,canActivate:[LoggedInService]},
  {path:'edit-score',component:AdminComponent,canActivate:[LoggedInService]},
  

  {path:'leaderboard',component:LeaderboardComponent},
  
  {path:'admin-login',component:LoginComponent,canActivate:[GuardLoginService]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

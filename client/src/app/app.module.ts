import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ZippassComponent } from './zippass/zippass.component';
import { RegisterComponent } from './register/register.component';
import { QuestionRegisterComponent } from './question-register/question-register.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    LeaderboardComponent,
    ZippassComponent,
    RegisterComponent,
    QuestionRegisterComponent,
   
   
  ],
  imports: [


    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

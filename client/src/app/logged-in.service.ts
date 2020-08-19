import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {

  constructor(private bs:BackendService,private router:Router) { }
  canActivate():any{
    if(localStorage.getItem("admin-logged")=="true")
      return true;
    else
    {
      this.router.navigateByUrl("admin-login");
      return false;
    }
    }
}


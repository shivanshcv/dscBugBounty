import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginService {

  constructor(private bs:BackendService,private router:Router) { }
  canActivate():any{
    if(localStorage.getItem("admin-logged")=="true")
    {
    this.router.navigateByUrl("edit-score");
    return false;
  }
    else
    {
      
      return true;
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup=new FormGroup({
    username:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required])


    
    
  });
  constructor(private bs:BackendService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm.setValue({username:null,password:null})
  }
async submit(){
  if(!this.loginForm.valid)
  {
    
    alert("Form is not Valid");
    this.ngOnInit();
    this.router.navigateByUrl("admin-login");
    
  }
  else{
  this.bs.login(this.loginForm.value).subscribe((data)=>{
    
    
    if(data['error']=='false')
    {
      
      
      localStorage.setItem("admin-logged","true");
    
    
    
      this.router.navigateByUrl("edit-score")
    }
    else
    {
      alert("Wrong Credentials")
      localStorage.setItem("admin-logged",'false');
      this.ngOnInit();
      this.router.navigateByUrl("admin-login");
    
    }
  })
}
}
}


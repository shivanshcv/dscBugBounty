import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required]),
    teamNo:new FormControl(null,[Validators.required]),
    teamName:new FormControl(null,[Validators.required]),
    cScore:new FormControl(null),
    webScore:new FormControl(null),
    totalScore:new FormControl(null)


    
    
  });

  constructor(private bs:BackendService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm.setValue({email:null,teamNo:null,teamName:null,cScore:null,webScore:null,totalScore:null});
  }
  async submit(){
    if(!this.registerForm.valid)
    {
      
      alert("Form is not Valid");
      this.ngOnInit();
      this.router.navigateByUrl("add-team");
      
    }
    else{
    this.bs.register(this.registerForm.value).subscribe((data)=>{
      if(data['error'])
      {
        alert("The team has already been registered");
        this.ngOnInit();
        this.router.navigateByUrl("add-team");

      }
      
      else
      {
        alert("The team " +data['teamName']+" is successfully registered");
        this.ngOnInit();
        this.router.navigateByUrl("add-team");
      }
      
      

     
      
    })
  }
  }

}


import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-question-register',
  templateUrl: './question-register.component.html',
  styleUrls: ['./question-register.component.css']
})
export class QuestionRegisterComponent implements OnInit {
  questionAddForm:FormGroup=new FormGroup({
    questionNo:new FormControl(null,[Validators.required]),
    question:new FormControl(null,[Validators.required]),
    score:new FormControl(null,[Validators.required]),
    answer:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required])

    
    
  });
  constructor(private bs:BackendService,private router:Router) { }

  ngOnInit(): void {
    this.questionAddForm.setValue({questionNo:null,question:null,score:null,answer:null,password:null});
  }
  async submit(){
    if(!this.questionAddForm.valid)
    {
      
      
      alert("Form is not Valid");
      this.ngOnInit();
      this.router.navigateByUrl("add-question");
    }
    else
    {
      
      this.bs.addQuestion(this.questionAddForm.value).subscribe((data)=>{
          if(data['error']){
            alert("this question has already been added");
            this.ngOnInit();
            this.router.navigateByUrl("add-question");
          }
          else
          {
            alert("The question has been successfully added");
            this.ngOnInit();
            this.router.navigateByUrl("add-question");
          }
      })
    }
  }

}


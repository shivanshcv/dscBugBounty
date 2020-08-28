import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import {ChangeDetectorRef} from '@angular/core'

 
@Component({
  selector: 'app-zippass',
  templateUrl: './zippass.component.html',
  styleUrls: ['./zippass.component.css']
})
export class ZippassComponent implements OnInit {
 
  
  logged=false;
  team = {
    teamNo : "",
    teamName : "",
    solved : [0],
  }
  error=false;
 
  prompt = false;
  answer = false;
  password = "";
  questions : String[] = [];
 
  toSolve = {
    questionNo : 0,
    solution : "",
  }
 
  constructor(
    private bs : BackendService,
    private ref: ChangeDetectorRef
  ) { }
 
  ngOnInit(): void {
    
 if(sessionStorage.getItem("logged")==null){
   this.logged=false;
   sessionStorage.setItem('logged','false')
 }   
 else
  this.logged=true;
    


  
  if(this.logged==true){

   this.login();
  }
}
login() {
  if (this.team.teamNo == "") {
    console.log(localStorage.getItem('no'));
    this.team.teamNo = localStorage.getItem('no');
  }
  else {
    localStorage.setItem('no',this.team.teamNo);
    console.log(localStorage.getItem('no'));
  }
  
  this.bs.teamLogin(this.team).subscribe(obj => {
    if (obj['team'] == null)
    {
      this.error=true;
      this.ref.detectChanges();
      return;
    }
    this.team = obj['team'];
    this.error = false;
    sessionStorage.setItem('logged','true');
    this.logged=true;
    this.bs.getQues().subscribe(ques => {
      this.questions = ques['arr'];
      
      
      this.ref.detectChanges();
      
    });
    
  })
  
}
 
  solve(i : number) {
    
    this.toSolve.questionNo = i;
    this.prompt = true;
    this.answer = false;
    this.toSolve.solution = "";
    this.password = "";
    
  }
  goDown(){
    window.scrollTo(0,document.body.scrollHeight);
  }
 

  submit() {
    if (this.toSolve.solution != null) {
      this.answer = true;
    
      if (this.toSolve.solution == this.questions[this.toSolve.questionNo]['answer']) {
        let m={
          teamNo:this.team.teamNo,
          question:this.questions[this.toSolve.questionNo]
        }
        this.bs.changeScore(m).subscribe((data)=>{
          let m={
            teamNo:data.teamNo,
            teamName:data.teamName,
            solved:data.solved
          }
          this.team=m;
          
        })
        this.password = "Password is : " + this.questions[this.toSolve.questionNo]['password'] ;
          // this.team.solved['arr'][this.toSolve.questionNo] = 1;
          this.prompt = false;
        
        
          
      }
      else {
        this.password = "Wrong solution. Try again."
      }
    }
  }
 
}
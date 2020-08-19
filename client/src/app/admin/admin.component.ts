import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  public teams:any;
  constructor(private bs:BackendService,private router:Router) { }

  async ngOnInit() {
    let m=await this.bs.getTeams().subscribe((data)=>{
      
      this.teams=data;
      
    })
  }
  edit(id:string,teamName:string){
    
    var webScore=parseInt(prompt("Enter the web Score for the team "+teamName));
    this.bs.editScore(webScore,id,teamName).subscribe((data)=>{
      if(data['error'])
        {
          alert(data['message']);
          this.ngOnInit();
        }
      else
      {
        alert(data['message']);
        this.ngOnInit();
      }

      
    })
    
    
  }



}


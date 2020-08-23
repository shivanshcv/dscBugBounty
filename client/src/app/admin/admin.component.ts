import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import {ChangeDetectorRef} from '@angular/core'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  public teams:any;
  constructor(private bs:BackendService,private router:Router,private ref: ChangeDetectorRef) { }

  async ngOnInit() {
    let m=await this.bs.getTeams().subscribe((data)=>{
      
      this.teams=data;
      
    })
    setInterval(()=>{
      this.bs.getTeams().subscribe((data)=>{
      
        this.teams=data;
        this.ref.detectChanges();
        
      })
    },5500);

  }

  edit(id:string,teamName:string){
    
    var webScore=parseInt(prompt("Enter the web Score to be added for the team "+teamName));
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


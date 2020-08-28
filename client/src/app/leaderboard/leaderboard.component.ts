import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

import {ChangeDetectorRef} from '@angular/core'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  teamArr : any[];

  constructor(
    private backend : BackendService,
    private ref: ChangeDetectorRef
  ) { }

  
  ngOnInit(): void {
    this.backend.getTeams().subscribe(arr => {
      this.teamArr = arr.sort(this.sortRank);
    })
    
    setInterval(()=>{
      this.backend.getTeams().subscribe(arr => {
        this.teamArr = arr.sort(this.sortRank);
        this.ref.detectChanges();
      })
    },75500);
  }

  sortRank(a, b) {
    if (a['totalScore'] < b['totalScore']) {
      return 1;
    }
    else if (a['totalScore'] > b['totalScore']) {
      return -1;
    }
    else {
      
      let aLatestTimeC = a['solved']['dateTime'].sort().slice(-1).pop();

      let bLatestTimeC= b['solved']['dateTime'].sort().slice(-1).pop();
      let aLatestTimeWeb=a['solved']['webdatetime'];
      let bLatestTimeWeb=b['solved']['webdatetime'];
      let aLatestTime;
      let bLatestTime;
      console.log(aLatestTimeC);
      console.log(aLatestTimeWeb);
      console.log(bLatestTimeC);
      console.log(bLatestTimeWeb);
      
      
      
      
      
      
      if(aLatestTimeC>aLatestTimeWeb)
      {
        aLatestTime=aLatestTimeC;
        console.log("a-c"+aLatestTime);
        
      }
      else
      {
        aLatestTime=aLatestTimeWeb
        console.log("a-w"+aLatestTime);
      }
      if(bLatestTimeC>bLatestTimeWeb)
      {
        bLatestTime=bLatestTimeC
        console.log("b-c"+bLatestTime);
      }
      else
      {
        bLatestTime=bLatestTimeWeb;
        console.log("b-w"+bLatestTime);
      }
      if(aLatestTime>bLatestTime)
        console.log("a bada");
      else
        console.log("b bada");
        
        
      return (aLatestTime - bLatestTime);
    }
  }

}
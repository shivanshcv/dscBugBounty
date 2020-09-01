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
  time = new Date();

  constructor(
    private backend : BackendService,
    private ref: ChangeDetectorRef
  ) { }

  
  ngOnInit(): void {
    this.backend.getTeams().subscribe(arr => {
      this.teamArr = arr.sort(this.sortRank);
    })
    setInterval(() => {
      this.time = new Date();
   }, 1000);
    
  }


  sortRank(a, b) {
    if (a['totalScore'] < b['totalScore']) {
      return 1;
    }
    else if (a['totalScore'] > b['totalScore']) {
      return -1;
    }
    else {
      
      let aLatestTime = a['solved']['dateTime'].sort((a,b) => b - a).pop();
      let bLatestTime = b['solved']['dateTime'].sort((a,b) => b - a).pop();
     
      return (bLatestTime-aLatestTime);
    }
  }

}
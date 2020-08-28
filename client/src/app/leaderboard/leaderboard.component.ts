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
    },7500);
  }

  sortRank(a, b) {
    if (a['totalScore'] < b['totalScore']) {
      return 1;
    }
    else if (a['totalScore'] > b['totalScore']) {
      return -1;
    }
    else {
      let aLatestTime = a['solved']['dateTime'].sort().slice(-1).pop();
      let bLatestTime = b['solved']['dateTime'].sort().slice(-1).pop();
      return (aLatestTime - bLatestTime);
    }
  }

}
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
      this.teamArr = arr.sort((a,b) => b['totalScore'] - a['totalScore']);
    })
    
    setInterval(()=>{
      this.backend.getTeams().subscribe(arr => {
        this.teamArr = arr.sort((a,b) => b['totalScore'] - a['totalScore']);
        this.ref.detectChanges();
      })
    },7500);
  }

}
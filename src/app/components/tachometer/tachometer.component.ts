import { Component, OnInit } from '@angular/core';
import { DashService } from 'app/dash.service';

@Component({
  selector: 'app-tachometer',
  templateUrl: './tachometer.component.html',
  styleUrls: ['./tachometer.component.scss']
})
export class TachometerComponent implements OnInit {

  constructor(private dash: DashService) { }

  ngOnInit() {
  }

}

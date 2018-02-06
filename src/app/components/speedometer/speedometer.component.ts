import { Component, OnInit } from '@angular/core';
import { DashService } from 'app/dash.service';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss']
})
export class SpeedometerComponent implements OnInit {

  constructor(private dash: DashService) { }

  ngOnInit() {
  }

}
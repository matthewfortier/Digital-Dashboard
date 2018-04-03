import { Component, OnInit } from '@angular/core';
import { DashService } from '../../dash.service';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss']
})
export class SpeedometerComponent implements OnInit {

  mph: Boolean = true;

  constructor(private dash: DashService, private settings: SettingsService) {
    this.mph = this.settings.speedUnit == "mph";
  }

  ngOnInit() {
  }

}

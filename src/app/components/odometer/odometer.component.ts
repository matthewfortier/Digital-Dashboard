import { Component, OnInit } from '@angular/core';
import { DashService } from '../../dash.service';
import { SettingsService } from '../../settings.service'

@Component({
  selector: 'app-odometer',
  templateUrl: './odometer.component.html',
  styleUrls: ['./odometer.component.scss']
})
export class OdometerComponent implements OnInit {

  constructor(private dash: DashService, private settings: SettingsService) { }

  ngOnInit() {
  }

}

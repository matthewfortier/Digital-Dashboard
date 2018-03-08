import { Component, OnInit } from '@angular/core';
import { DashService } from '../../dash.service';
import { SettingsService } from '../../settings.service'

@Component({
  selector: 'app-tachometer',
  templateUrl: './tachometer.component.html',
  styleUrls: ['./tachometer.component.scss']
})
export class TachometerComponent implements OnInit {

  constructor(private dash: DashService, private settings: SettingsService) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { DashService } from '../../dash.service'
import { SettingsService } from '../../settings.service'

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  constructor(private dash: DashService, private settings: SettingsService) { }

  ngOnInit() {
  }

}

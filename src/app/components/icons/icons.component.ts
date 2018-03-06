import { Component, OnInit } from '@angular/core';
import { DashService } from '../../dash.service';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  constructor(private dash: DashService, private settings: SettingsService) { }

  ngOnInit() {
  }

}

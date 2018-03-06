import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../settings.service'
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'settings-flyout',
  templateUrl: './settings-flyout.component.html',
  styleUrls: ['./settings-flyout.component.scss']
})
export class SettingsFlyoutComponent implements OnInit {

  speedUnit: String
  macAddress: String
  bgColor: String
  pColor: String
  sColor: String

  constructor(private settings: SettingsService, private renderer: Renderer2) {
    this.speedUnit = settings.speedUnit
    this.macAddress = settings.macAddress
    this.pColor = settings.pColor
    this.sColor = settings.sColor
  }

  ngOnInit() {
  }

  changeUnit(event) {
    console.log(event.srcElement.value)
    this.settings.speedUnit = event.srcElement.value
  }

  changeBg(event) {
    console.log(event.srcElement.value)
    this.settings.bgColor = "#" + event.srcElement.value
  }

  changePrimary(event) {
    console.log(event.srcElement.value)
    this.settings.pColor = "#" + event.srcElement.value
  }

  changeSecondary(event) {
    console.log(event.srcElement.value)
    this.settings.sColor = "#" + event.srcElement.value
  }

}

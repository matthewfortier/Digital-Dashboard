import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../settings.service'

@Component({
  selector: 'component-selector-flyout',
  templateUrl: './component-selector-flyout.component.html',
  styleUrls: ['./component-selector-flyout.component.scss']
})
export class ComponentSelectorFlyoutComponent implements OnInit {

  constructor(private settings: SettingsService) { }

  ngOnInit() {
  }

}

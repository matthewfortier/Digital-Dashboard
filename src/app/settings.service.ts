import { Inject, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { DOCUMENT } from '@angular/platform-browser';
import { AppComponent } from './app.component';
declare var jquery: any;
declare var $: any;

@Injectable()
export class SettingsService {

  speedUnit: String = "kph";
  macAddress: String = "00:00:00:00";
  bgColor: String = "#11121a";
  pColor: String = "#f35f76";
  sColor: String = "#9cf9ec";
  shadows: Boolean = true;

  dashboard = [
    { cols: 19, rows: 18, y: 2, x: 23, label: "SpeedometerComponent" },
    { cols: 14, rows: 14, y: 4, x: 7, label: "TachometerComponent" },
    { cols: 5, rows: 2, y: 1, x: 58, label: "ContextComponent" },
    { cols: 18, rows: 7, y: 8, x: 44, label: "RangeComponent" },
    { cols: 6, rows: 11, y: 6, x: 0, label: "IconsComponent" },
    { cols: 11, rows: 3, y: 21, x: 27, label: "OdometerComponent" }
  ];

  components = [
    "SpeedometerComponent",
    "TachometerComponent",
    "ContextComponent",
    "RangeComponent",
    "IconsComponent",
    "OdometerComponent"
  ]

  constructor(@Inject(DOCUMENT) private document: any) { }

  darken(color, percent) {  // deprecated. See below.
    var num = parseInt(color.slice(1), 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  kphToMph(kph) {
    return Math.floor(kph * 0.6214);
  }

  removeBoxShadows() {
    if (this.shadows) {
      $("*").css("box-shadow", "none");
      this.shadows = false;
      console.log("Remove Box Shadows");
    } else {
      $("*").css("box-shadow", "inherit");
      this.shadows = true;
      console.log("Add Box Shadows");
    }
  }

  changeComponent(component) {
    if (this.componentEnabled(component)) {
      this.dashboard = this.dashboard.filter(function (item) {
        return item.label !== component
      })
    } else {
      this.dashboard.push({ cols: 10, rows: 5, y: 0, x: 0, label: component })
    }
    console.log(this.dashboard)
  }

  componentEnabled(component) {
    return this.dashboard.some(e => e.label === component)
  }
}

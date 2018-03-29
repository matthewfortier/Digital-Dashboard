import { Inject, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  speedUnit: String = "kph";
  macAddress: String = "00:00:00:00";
  bgColor: String = "#11121a";
  pColor: String = "#f35f76";
  sColor: String = "#9cf9ec";

  constructor(@Inject(DOCUMENT) private document: any) { }

  darken(color, percent) {  // deprecated. See below.
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
  }

  kphToMph(kph) {
      return Math.floor(kph * 0.6214);
  }
}

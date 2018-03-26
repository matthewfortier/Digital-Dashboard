import { Injectable } from '@angular/core';
import {
  CompactType, DisplayGrid, GridsterComponentInterface, GridsterConfig, GridsterItem, GridsterItemComponentInterface,
  GridType
}  from 'angular-gridster2';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class DashService {

  dashboard: Array<GridsterItem>;
  speed: Number;
  rpm: Number;
  range: Number;
  odom: Number;

  constructor() {

    // ipcRenderer.on("speed", function (evt, result) {
    //   this.speed = result;
    // }.bind(this));

    // ipcRenderer.on("rpm", function (evt, result) {
    //   this.rpm = result;
    // }.bind(this));

    // ipcRenderer.on("range", function (evt, result) {
    //   this.range = result;
    // }.bind(this));

    // ipcRenderer.on("odom", function (evt, result) {
    //   this.odom = result;
    // }.bind(this));

  }
}
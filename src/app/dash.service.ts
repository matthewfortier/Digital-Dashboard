import { Injectable } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { ipcRenderer } from "electron";
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

  constructor(public electronService: ElectronService) {

    ipcRenderer.on("speed", function (evt, result) {
      this.speed = result;
    }.bind(this));

    ipcRenderer.on("rpm", function (evt, result) {
      this.rpm = result;
    }.bind(this));

    ipcRenderer.on("range", function (evt, result) {
      this.range = result;
    }.bind(this));

    ipcRenderer.on("odom", function (evt, result) {
      this.odom = result;
    }.bind(this));

  }
}
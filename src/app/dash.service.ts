import {
  CompactType, DisplayGrid, GridsterComponentInterface, GridsterConfig, GridsterItem, GridsterItemComponentInterface,
  GridType
} from 'angular-gridster2';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Socket } from 'ng-socket-io';

export interface Dash {
  speed: string;
}

@Injectable()
export class DashService {

  dashboard: Array<GridsterItem>;
  // Could use dictionary, would make value checking easier
  speed: Number;
  rpm: Number;
  range: Number;
  odom: Number;
  oil: Number;
  coolant: Number;
  battery: Number;
  fuelLvl: Number;

  constructor(private socket: Socket) {

    socket.on("ecuData", function (msg) {
      this.speed = msg.SPEED;
      this.rpm = msg.RPM;
      this.range = msg.range; // not imp yet
      this.odom = msg.DISTANCE_SINCE_DTC_CLEAR;
      this.oil = msg.OIL_TEMP;
      this.coolant = msg.COOLANT_TEMP;
      this.battery = msg.CONTROL_MODULE_VOLTAGE;
      this.fuelLvl = msg.FUEL_LEVEL;
    }.bind(this))

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

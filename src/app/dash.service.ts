import {
  CompactType, DisplayGrid, GridsterComponentInterface, GridsterConfig, GridsterItem, GridsterItemComponentInterface,
  GridType
}  from 'angular-gridster2';

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
  speed: Number;
  rpm: Number;
  range: Number;
  odom: Number;

  constructor(private socket: Socket) {

    socket.on("ecuData", function(msg) {
      this.speed = msg.kph;
      this.rpm = msg.rpm;
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

import { Injectable } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { ipcRenderer } from "electron";
import {
  CompactType, DisplayGrid, GridsterComponentInterface, GridsterConfig, GridsterItem, GridsterItemComponentInterface,
  GridType
}  from 'angular-gridster2';

@Injectable()
export class DashService {

  dashboard: Array<GridsterItem>;

  constructor(public electronService: ElectronService) { }
}

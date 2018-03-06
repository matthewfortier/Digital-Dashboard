import {ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { ipcRenderer } from "electron";

import {
  CompactType, DisplayGrid, GridsterComponentInterface, GridsterConfig, GridsterItem, GridsterItemComponentInterface,
  GridType
}  from 'angular-gridster2';
import {GridsterItemComponent, GridsterPush, GridsterPushResize, GridsterSwap} from 'angular-gridster2';
import { Router } from '@angular/router';

import { SpeedometerComponent } from './components/speedometer/speedometer.component';
import { resolve } from 'url';
import { DashService } from 'app/dash.service';
import { TachometerComponent } from './components/tachometer/tachometer.component';
import { ContextComponent } from './components/context/context.component';
import { RangeComponent } from './components/range/range.component';
import { IconsComponent } from './components/icons/icons.component';
import { SettingsService } from './settings.service'
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  entryComponents: [SpeedometerComponent]
})
export class AppComponent {

  components = {
    'SpeedometerComponent': SpeedometerComponent,
    'TachometerComponent': TachometerComponent,
    'ContextComponent': ContextComponent,
    'RangeComponent': RangeComponent,
    'IconsComponent': IconsComponent
  }

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  remove: boolean;

  windowHeight: Number;
  windowWidth: Number;

  gridRows: number;
  gridCols: number;
  cellSize: number;
  cellCount: Number = 1500;

  bgColor: String;

  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private dash: DashService,
    private settings: SettingsService) {

    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;

    console.log(this.windowHeight)
    console.log(this.windowWidth)

    this.calculateSquares(this.windowWidth, this.windowHeight, this.cellCount);

    this.dashboard = [];
    
    translate.setDefaultLang('en');

    this.bgColor = this.settings.bgColor;

    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  static eventStop(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent) {
    console.info('eventStop', item, itemComponent, event);
  }

  static eventStart(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent) {
    console.info('eventStart', item, itemComponent, event);
  }

  static itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.info('itemChanged', item, itemComponent);
    ipcRenderer.send('itemChanged', item);
  }

  static itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.info('itemResized', item, itemComponent);
  }

  static itemInit(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.info('itemInitialized', item, itemComponent);
  }

  static itemRemoved(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.info('itemRemoved', item, itemComponent);
  }

  static gridInit(grid: GridsterComponentInterface) {
    console.info('gridInit', grid);
  }

  static gridDestroy(grid: GridsterComponentInterface) {
    console.info('gridDestroy', grid);
  }

  emptyCellClick(event: MouseEvent, item: GridsterItem) {
    console.info('empty cell click', event, item);
    this.dashboard.push(item);
  }

  //https://math.stackexchange.com/questions/466198/algorithm-to-get-the-maximum-size-of-n-squares-that-fit-into-a-rectangle-with-a
  calculateSquares(x, y, n) {
    var ratio = x / y;
    var ncols_float = Math.sqrt(n * ratio);
    var nrows_float = n / ncols_float;

    // Find best option filling the whole height
    var nrows1 = Math.ceil(nrows_float);
    var ncols1 = Math.ceil(n / nrows1);
    while (nrows1 * ratio < ncols1) {
        nrows1++;
        ncols1 = Math.ceil(n / nrows1);
    }
    var cell_size1 = y / nrows1;

    // Find best option filling the whole width
    var ncols2 = Math.ceil(ncols_float);
    var nrows2 = Math.ceil(n / ncols2);
    while (ncols2 < nrows2 * ratio) {
        ncols2++;
        nrows2 = Math.ceil(n / ncols2)
    }
    var cell_size2 = x / ncols2;

    // Find the best values
    if (cell_size1 < cell_size2) {
        this.gridRows = nrows2;
        this.gridCols = ncols2;
        this.cellSize = cell_size2;
    } else {
        this.gridRows = nrows1;
        this.gridCols = ncols1;
        this.cellSize = cell_size1;
    }
  }

  ngOnInit() {

    setInterval(function() {
      console.log("Test")
      this.bgColor = "#999333";
    },1000)

    this.options = {
      gridType: GridType.Fixed,
      compactType: CompactType.None,
      initCallback: AppComponent.gridInit,
      destroyCallback: AppComponent.gridDestroy,
      itemChangeCallback: AppComponent.itemChange,
      itemResizeCallback: AppComponent.itemResize,
      itemInitCallback: AppComponent.itemInit,
      itemRemovedCallback: AppComponent.itemRemoved,
      margin: 0,
      outerMargin: true,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: this.gridCols,
      minRows: 1,
      maxRows: this.gridRows,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: this.cellSize,
      fixedRowHeight: this.cellSize,
      keepFixedHeightInMobile: true,
      keepFixedWidthInMobile: true,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellClickCallback: this.emptyCellClick.bind(this),
      emptyCellContextMenuCallback: this.emptyCellClick.bind(this),
      emptyCellDropCallback: this.emptyCellClick.bind(this),
      emptyCellDragCallback: this.emptyCellClick.bind(this),
      emptyCellDragMaxCols: 0,
      emptyCellDragMaxRows: 0,
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        stop: AppComponent.eventStop,
        start: AppComponent.eventStart
      },
      resizable: {
        delayStart: 0,
        enabled: true,
        stop: AppComponent.eventStop,
        start: AppComponent.eventStart,
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }
      },
      swap: false,
      pushItems: false,
      disablePushOnDrag: true,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.OnDragAndResize,
      disableWindowResize: true,
      disableWarnings: false,
      scrollToNewItems: false
    };

    ipcRenderer.send("mainWindowLoaded");
    /* ipcRenderer.send("requestComponents");
    ipcRenderer.on("resultSent", function (evt, result) {
      let list: Array<GridsterItem> = [];
      this.dashboard = []

      for (var i = 0; i < result.length; i++) {
        var item: GridsterItem = {cols: result[i].cols, rows: result[i].rows, y: result[i].y, x: result[i].x, label: result[i].name};
        this.dashboard.push(item);
        console.log(item);
      }
    }.bind(this)); */

    this.dashboard = [
      {cols: 19, rows: 18, y: 3, x: 23, label: 'SpeedometerComponent'},
      {cols: 14, rows: 14, y: 5, x: 6, label: 'TachometerComponent'},
      {cols: 5, rows: 2, y: 1, x: 58, label: 'ContextComponent'},
      {cols: 16, rows: 7, y: 9, x: 45, label: 'RangeComponent'},
      {cols: 6, rows: 11, y: 11, x: 1, label: 'IconsComponent'},
    ];
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({});
  }

  destroy() {
    this.remove = !this.remove;
  }
}
import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { DashService } from './dash.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { SpeedometerComponent } from './components/speedometer/speedometer.component';

import { GridsterModule } from 'angular-gridster2';
import { DynamicModule } from 'ng-dynamic-component';
import { TachometerComponent } from './components/tachometer/tachometer.component';
import { ContextComponent } from './components/context/context.component';
import { RangeComponent } from './components/range/range.component';
import { SettingsFlyoutComponent } from './components/settings-flyout/settings-flyout.component';
import { SettingsService } from './settings.service';
import { IconsComponent } from './components/icons/icons.component';
import { OdometerComponent } from './components/odometer/odometer.component';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:4200', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    SpeedometerComponent,
    TachometerComponent,
    ContextComponent,
    RangeComponent,
    SettingsFlyoutComponent,
    IconsComponent,
    OdometerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    GridsterModule,
    DynamicModule.withComponents([SpeedometerComponent, TachometerComponent, ContextComponent, RangeComponent, IconsComponent, OdometerComponent]),
    SocketIoModule.forRoot(config),
  ],
  providers: [DashService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

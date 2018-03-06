import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';
import { DashService } from 'app/dash.service';

import { WebviewDirective } from 'app/directives/webview.directive';

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

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    SpeedometerComponent,
    TachometerComponent,
    ContextComponent,
    RangeComponent,
    SettingsFlyoutComponent,
    IconsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    GridsterModule,
    DynamicModule.withComponents([SpeedometerComponent, TachometerComponent, ContextComponent, RangeComponent, IconsComponent]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, DashService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

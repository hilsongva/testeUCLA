import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// https://material.angular.io/guide/getting-started#step-5-gesture-support
import 'hammerjs';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) enableProdMode();

platformBrowserDynamic().bootstrapModule (AppModule)
  .catch (err => {if (window.console) console.log (err)});

import { ErrorHandler, NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import * as Raven from 'raven-js'; // https://docs.sentry.io/clients/javascript/integrations/angular/
import { AppComponent } from './app.co';
import { ErrorComponent } from './error.co';
import { FinalScore } from './r-ucla/final-score.co';
import { QuestionComponent } from './r-ucla/question.co';
import { WelcomeComponent } from './welcome.co';

// https://sentry.io/gift/loneliness-scale/
Raven.config ('https://dcb627941c0d4be98357adf5db3215df@sentry.io/1210948') .install()

export class RavenErrorHandler extends ErrorHandler {
  handleError (err: any): void {
    Raven.captureException (err.originalError || err);
    super.handleError (err)}}  // Invoke the default error handler in order to see the error in the console.

const ROUTES: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'r-ucla/fin', component: FinalScore },
  { path: 'r-ucla/:n', component: QuestionComponent }];

@NgModule({
  declarations: [AppComponent, ErrorComponent, FinalScore, WelcomeComponent, QuestionComponent],
  // Dynamically created components, cf. https://stackoverflow.com/a/41519512/257568.
  entryComponents: [ErrorComponent],
  imports: [
    RouterModule.forRoot(ROUTES, {useHash: true}),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule],
  providers: [{provide: ErrorHandler, useClass: RavenErrorHandler}],
  bootstrap: [AppComponent]})
export class AppModule { }

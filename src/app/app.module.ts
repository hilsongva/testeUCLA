import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.co';
import { WelcomeComponent } from './welcome.co';
import { QuestionComponent } from './r-ucla/question.co'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';

import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'r-ucla/:n', component: QuestionComponent }];

@NgModule({
  declarations: [AppComponent, WelcomeComponent, QuestionComponent],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

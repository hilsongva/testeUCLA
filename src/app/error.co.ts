import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material';

// https://material.angular.io/components/dialog/overview

/** Something to be displayed when an unexpected error happens. */
@Component({
  template: `
    <h2 mat-dialog-title>Ups</h2>
    <mat-dialog-content>{{msg}}</mat-dialog-content>`})
export class ErrorComponent {
  msg?: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) {
    this.msg = data.msg}}

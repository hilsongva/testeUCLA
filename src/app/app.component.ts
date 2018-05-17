import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fillerNav = Array(50).fill(0).map((_, i) => `Nav ${i + 1}`);
  fillerContent = Array(50).fill(0).map(() =>
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut');
}

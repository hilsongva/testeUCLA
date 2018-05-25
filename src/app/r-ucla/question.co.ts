import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ErrorComponent } from '../error.co';

// TODO: Persist the answers in the browser.
// TODO: Redirect back to the first question if we can't find the data.

type Question = string
type ReverseScored = boolean
const QUESTIONS: ([Question, ReverseScored]|null)[] = [null,
  ['I feel in tune with the people around me', true],  // 1.
  ['I lack companionship', false],  // 2.
  ['There is no one I can turn to', false],  // 3.
  ['I do not feel alone', false],  // 4.
  ['I feel part of a group of friends', true],  // 5.
  ['I have a lot in common with the people around me', true],  // 6.
  ['I am no longer close to anyone', false],  // 7.
  ['My interests and ideas are not shared by those around me', false],  // 8.
  ['I am an outgoing person', true],  // 9.
  ['There arc people I feel close to', true],  // 10.
  ['I feel left out', false],  // 11.
  ['My social relation ships are superficial', false],  // 12.
  ['No one really knows me well', false],  // 13.
  ['I feel isolated from others', false],  // 14.
  ['I can find companionship when I want it', true],  // 15.
  ['There are people who really understand me', true],  // 16.
  ['I am unhappy being so withdrawn', false],  // 17.
  ['People are around me but not with me', false],  // 18.
  ['There are people I can talk to', true],  // 19.
  ['There are people I can turn to', true]]  // 20.

@Component({
  templateUrl: 'question.co.html',
  styleUrls: ['question.co.scss']})
export class QuestionComponent implements OnInit {
  /** The question to display, 1-based. */
  num?: number;
  question?: Question;
  /** Time we started transitioning from question to question, fading out the old question. */
  fadingOut: number | null = null;
  /** Time we started transitioning from question to question, fading in the new question. */
  fadingIn: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe ((params: ParamMap) => {
      const ns = params.get ('n');
      const n = ns ? +ns : 0;
      const q = QUESTIONS[n];
      if (q != null) {
        this.num = n;
        this.question = q[0];
      } else {
        setTimeout (() => this.dialog.open (ErrorComponent, {disableClose: true, data: {msg: 'No such question'}}), 1)}})}

  private proceed (num: number | undefined, rate: number) {
    if (num == null) throw new Error ("!num");
    if (this.fadingOut || (this.fadingIn && Date.now() - this.fadingIn < 200)) return;  // Too late, we're already in transition.
    const tuple = QUESTIONS[num];
    const reverseScored = tuple ? tuple[1] : false;
    const normalized = reverseScored ? 5 - rate : rate;
    console.info ('num:', num, '; rate:', rate, '; reverseScored:', reverseScored, '; normalized:', normalized);
    if (QUESTIONS[num + 1]) {  // If there is a next question then route there.
      this.fadingOut = Date.now();
      setTimeout (() => {
        this.fadingIn = Date.now();
        this.fadingOut = null;
        this.router.navigate (['/r-ucla/', num + 1]);
        setTimeout (() => {
          this.fadingIn = null;
        }, 400);
      }, 400);
    } else {
      // TODO: Route to final screen.
    }}

  never() {this.proceed (this.num, 1)}
  rarely() {this.proceed (this.num, 2)}
  sometimes() {this.proceed (this.num, 3)}
  often() {this.proceed (this.num, 4)}}

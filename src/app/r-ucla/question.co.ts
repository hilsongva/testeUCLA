import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ErrorComponent } from '../error.co';

// TODO: Redirect to the next question upon getting an answer.
// TODO: Persist the answers in the browser.
// TODO: Redirect back to the first question if we can't find the data.

type Question = string
type ReverseScored = boolean
const QUESTIONS: ([Question, ReverseScored]|null)[] = [null,
  ['I feel in tune with the people around me', false],  // 1.
  ['I lack companionship', false],  // 2.
  ['There is no one I can turn to', false],  // 3.
  ['I do not feel alone', false],  // 4.
  ['I feel part of a group of friends', false],  // 5.
  ['I have a lot in common with the people around me', false],  // 6.
  ['I am no longer close to anyone', false],  // 7.
  ['My interests and ideas are not shared by those around me', false],  // 8.
  ['I am an outgoing person', false],  // 9.
  ['There arc people I feel close to', false],  // 10.
  ['I feel left out', false],  // 11.
  ['My social relation ships are superficial', false],  // 12.
  ['No one really knows me well', false],  // 13.
  ['I feel isolated from others', false],  // 14.
  ['I can find companionship when I want it', false],  // 15.
  ['There are people who really understand me', false],  // 16.
  ['I am unhappy being so withdrawn', false],  // 17.
  ['People are around me but not with me', false],  // 18.
  ['There are people I can talk to', false],  // 19.
  ['There are people I can turn to', false]]  // 20.

/*
Scoring:
Items 1, 5, 6, 9, 10, 15, 16, 19, 20 are all reverse scored.
Keep scoring continuous.
*/

@Component({
  templateUrl: 'question.co.html',
  styleUrls: ['question.co.scss']})
export class QuestionComponent implements OnInit {
  /** The question to display, 1-based. */
  num?: number;
  question?: Question;

  constructor(
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
        setTimeout(() => this.dialog.open (ErrorComponent, {disableClose: true, data: {msg: 'No such question'}}), 1)}})}}

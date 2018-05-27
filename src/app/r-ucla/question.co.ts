import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ErrorComponent } from '../error.co';

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

type QuestionNumber = number;
type NormalizedScore = number;
interface QuestionScores {[question: string]: NormalizedScore}  // JSON keys are strings.
interface Store {
  /** Normalized R-UCLA question scores: question [1,20] -> score [1,4]. */
  answers: QuestionScores}
function newStore(): Store {return {answers: {}}}

type TimeMs = number;

@Component({
  templateUrl: 'question.co.html',
  styleUrls: ['question.co.scss']})
export class QuestionComponent implements OnInit {
  /** The question to display, 1-based. */
  num?: QuestionNumber;
  question?: Question;
  /** Time we started transitioning from question to question, fading out the old question. */
  fadingOut: TimeMs | null = null;
  /** Time we started transitioning from question to question, fading in the new question. */
  fadingIn: TimeMs | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  /** Loads the `Store` from the browser local storage. Returns a new instance of the `Store` if the storage doesn't have one. */
  private loadStore(): Store {
    const json = localStorage.getItem ('r-ucla');
    let store: Store = json ? JSON.parse (json) : newStore();
    return store}

  /** Loads the `Store` from the browser local storage, runs the `visitor` on it,
   * rewrites the local storage with new version of the `Store`. */
  private withStore<R> (visitor: (store: Store) => R): R {
    let store = this.loadStore();
    const r = visitor (store);
    localStorage.setItem ('r-ucla', JSON.stringify (store));
    return r}

  ngOnInit() {
    this.route.paramMap.subscribe ((params: ParamMap) => {
      const ns = params.get ('n');
      const n = ns ? +ns : 0;
      const q = QUESTIONS[n];
      if (q != null) {
        // See if we have the scores for all the previous questions.
        const store = this.loadStore();
        let have_prior_scores = true;
        for (let num = 1; num < n; ++num) if (!store.answers[num]) {have_prior_scores = false; break}
        if (!have_prior_scores) {
          // Chance is that we don't have the scores of the previous questions.
          // For example, someone could share a link to question 12 with a friend, or decided to open it in another browser.
          // Continuing the questionnaire makes no sense when we've lost the prior scores. We won't be able to calculate the final score
          // and if we try something funny (like asking the lost questions later) we might confuse the user.
          // So I think the best solution here would be to redirect the user back to the first question.
          this.router.navigate (['/r-ucla/', 1])
        } else {
          this.num = n;
          this.question = q[0]}
      } else {
        setTimeout (() => this.dialog.open (ErrorComponent, {disableClose: true, data: {msg: 'No such question'}}), 1)}})}

  private proceed (num: QuestionNumber | undefined, score: NormalizedScore) {
    if (num == null) throw new Error ("!num");
    if (this.fadingOut || (this.fadingIn && Date.now() - this.fadingIn < 200)) return;  // Too late, we're already in transition.
    const tuple = QUESTIONS[num];
    const reverseScored = tuple ? tuple[1] : false;
    const normalized = reverseScored ? 5 - score : score;

    // Save the answers, allowing the user to continue the questionnaire across the browser restarts.
    this.withStore (store => store.answers[num] = normalized);

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

import { Component, OnInit, HostListener } from '@angular/core';
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
  /** We inject the "small" class in order to fit the answer buttons onto a small screen.
   * cf. https://codecraft.tv/courses/angular/built-in-directives/ngstyle-and-ngclass/ */
  small = false;
  /** Compresses the space between the buttons (by deducing it from the button width). */
  marginCorrection: number | null = null;
  /** Button rotation. Like `rotate(50deg)`. The more compressed the buttons are the more we need to rotate them to fit. */
  rotation: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  /** Gradually responsive design.  
   * Note that JavaScript adjustments are often delayed: when the page is loaded or the screen rotation happens,
   * a browser might see the unadjusted version first. This unadjusted version might have lingering effects.
   * For instance, if we apply `nowrap` to `buttons` then a browser might notice the page being larger than the screen
   * and permanently apply the viewport zooming to it. */
  private adjustSize() {
    const adaptationThreshold = 500;
    this.small = window.innerWidth < adaptationThreshold;
    if (this.small) {  // Gradual compression and rotation of the buttons.
      const minWidth = 266;  // My Chrome doesn't get smaller than that so it's the minimal width I've tested for.
      const range = adaptationThreshold - minWidth;  // The range of supported window widths.
      const shortage = Math.min (1, (adaptationThreshold - window.innerWidth) / range);  // 0..1, from least compressed to most compressed.
      this.marginCorrection = Math.round (- (9 + 49 * shortage));
      // The buttons are being read from the question downward
      // (that is, unline the table headers, they are below the question, not above it).
      // We have considered inversing the tilt but it doesn't sit right with me...
      this.rotation = 'rotate(' + Math.round (25 + 25 * shortage) + 'deg)';
      //console.info ('shortage:', shortage, '; marginCorrection:', this.marginCorrection, '; rotation:', this.rotation)
    } else {  // Turn off the compression and rotation.
      this.marginCorrection = null;
      this.rotation = null}}

  @HostListener ('window:resize', ['$event'])
  onResize (event: any) {
    this.adjustSize()}

  ngOnInit() {
    this.adjustSize();

    this.route.paramMap.subscribe ((params: ParamMap) => {
      const ns = params.get ('n');
      const n = ns ? +ns : 0;
      const q = QUESTIONS[n];
      if (q != null) {
        this.num = n;
        this.question = q[0];
      } else {
        setTimeout(() => this.dialog.open (ErrorComponent, {disableClose: true, data: {msg: 'No such question'}}), 1)}})}

  private next() {
    const nextNum = (this.num || 0) + 1}

  never() {
    console.info ('never');
    this.next()}

  rarely() {
    console.info ('rarely')
    this.next()}

  sometimes() {
    console.info ('sometimes')
    this.next()}

  often() {
    console.info ('often')
    this.next()}}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'question-co',
  templateUrl: './question.co.html'
})
export class QuestionComponent implements OnInit {
  /** The question to display, 1-based. */
  n?: number;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe ((params: ParamMap) => {
      this.n = +params.get ('n')})}}

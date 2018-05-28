import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  templateUrl: 'final-score.co.html'})
export class FinalScore implements OnInit {
  /** The total score of the Revised UCLA Loneliness Scale. */
  score?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe ((params: ParamMap) => {
      const scoreString = params.get ('score');
      if (scoreString == null) throw new Error ('Invalid URL, no score');
      const score = +scoreString;
      if (score < 20 || score > 80) throw new Error ('Invalid score: ' + scoreString);
      this.score = score})}}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationExtras,
  Route,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {
  names: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.names = this._formBuilder.group({
      name1: ['', [Validators.required]],
      name2: ['', [Validators.required]],
    });
  }

  start() {
    const navigationExtras: NavigationExtras = {
      state: this.names.value,
    };
    this._router.navigate([`/tabuleiro`], navigationExtras);
  }
}

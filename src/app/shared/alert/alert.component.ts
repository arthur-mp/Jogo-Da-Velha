import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  winningPlayer: string = '';
  gameResult: string = '';

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeVariables();
  }

  initializeVariables() {
    const { winningPlayer, gameResult } = this.data;

    if (winningPlayer) this.winningPlayer = winningPlayer;
    if (gameResult) this.gameResult = gameResult;
  }

  playAgain() {
    this.dialogRef.close(true);
  }

  doNotPlay() {
    this.dialogRef.close(false);
  }
}

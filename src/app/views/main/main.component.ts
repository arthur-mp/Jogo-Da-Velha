import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  playesNames: { name1: string; name2: string };

  buttonsPlayer1 = ['x', 'x', 'x', 'x', 'x'];
  buttonsPlayer2 = ['o', 'o', 'o', 'o', 'o'];

  turnPlayer1: boolean = true;
  turnPlayer2: boolean = false;

  winningPlayer: string;

  buttonClick: string = 'x';

  gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  refresh: boolean = false;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.playesNames = this.router.getCurrentNavigation()?.extras.state as {
      name1: string;
      name2: string;
    };
  }

  ngOnInit(): void {
    this.reloadLog();
  }

  reloadLog() {
    if (!this.playesNames) {
      this.router.navigate([`/`]);
    }
  }

  cardSelected(playerClick: any) {
    const { idCard, usedButton, nextPlayer, refresh } = playerClick;
    if(!refresh){
      this.refresh = false;
    }

    if (nextPlayer) {
      this.changeButtonCurrent(usedButton);

      this.changeTurnPlayer();

      this.insertOnBoard(idCard, usedButton);
    }
  }

  changeButtonCurrent(usedButton: string) {
    if (usedButton == 'x') this.buttonClick = 'o';
    else this.buttonClick = 'x';
  }

  changeTurnPlayer() {
    this.changeButtonsPlayer();
    this.turnPlayer1 = !this.turnPlayer1;
    this.turnPlayer2 = !this.turnPlayer2;
  }

  insertOnBoard(idCard: string, usedButton: string) {
    const coordinates = (idCard as string)
      .split('')
      .map((value) => parseInt(value));
    this.gameBoard[coordinates[0]][coordinates[1]] = usedButton;
    if(!this.verifygameBoard())
      this.lossGamer();
  }

  changeButtonsPlayer() {
    if (this.turnPlayer1) {
      this.buttonsPlayer1.splice(0, 1);
    } else {
      this.buttonsPlayer2.splice(0, 1);
    }
  }

  lossGamer(){
    const valueBoard = this.verifyBoard();
    if(!valueBoard) this.openDialog('','loss');
  }

  verifyBoard(): boolean{
    for (const line of this.gameBoard) {
      for (const valueCard of line) {
        if(valueCard == '') return true;
      }
    }

    return false;
  }

  verifygameBoard(): boolean {

    if(this.verifyLine()) return true;
    if(this.verifyColumn()) return true;
    if(this.verifyDiagonalPrincipal()) return true;
    if(this.verifyDiagonalSecondary()) return true;
    
    return false;
  }

  verifyLine(): boolean {
    for (let i = 0; i < 3; i++) {
      //Check x
      if (
        this.gameBoard[i][0] == 'x' &&
        this.gameBoard[i][1] == 'x' &&
        this.gameBoard[i][2] == 'x'
      ) {
        this.openDialog(this.playesNames.name1, 'win');
        return true;
      }

      //Check o
      if (
        this.gameBoard[i][0] == 'o' &&
        this.gameBoard[i][1] == 'o' &&
        this.gameBoard[i][2] == 'o'
      ) {
        this.openDialog(this.playesNames.name2, 'win');
        return true;
      }
    }
    return false;
  }

  verifyColumn(): boolean {
    for (let i = 0; i < 3; i++) {
      //Check x
      if (
        this.gameBoard[0][i] == 'x' &&
        this.gameBoard[1][i] == 'x' &&
        this.gameBoard[2][i] == 'x'
      ) {
        this.openDialog(this.playesNames.name1, 'win');
        return true;
      }

      //Check o
      if (
        this.gameBoard[0][i] == 'o' &&
        this.gameBoard[1][i] == 'o' &&
        this.gameBoard[2][i] == 'o'
      ) {
        this.openDialog(this.playesNames.name2, 'win');
        return true;
      }
    }
    return false;
  }

  verifyDiagonalPrincipal(): boolean {
    //Check x
    if (
      this.gameBoard[0][0] == 'x' &&
      this.gameBoard[1][1] == 'x' &&
      this.gameBoard[2][2] == 'x'
    ) {
      this.openDialog(this.playesNames.name1, 'win');
      return true;
    }

    //Check o
    if (
      this.gameBoard[0][0] == 'o' &&
      this.gameBoard[1][1] == 'o' &&
      this.gameBoard[2][2] == 'o'
    ) {
      this.openDialog(this.playesNames.name2, 'win');
      return true;
    }

    return false;
  }

  verifyDiagonalSecondary(): boolean {
    //Check x
    if (
      this.gameBoard[0][2] == 'x' &&
      this.gameBoard[1][1] == 'x' &&
      this.gameBoard[2][0] == 'x'
    ) {
      this.openDialog(this.playesNames.name1, 'win');
      return true;
    }

    //Check o
    if (
      this.gameBoard[0][2] == 'o' &&
      this.gameBoard[1][1] == 'o' &&
      this.gameBoard[2][0] == 'o'
    ) {
      this.openDialog(this.playesNames.name2, 'win');
      return true;
    }

    return false;
  }

  openDialog(player: string, result: string) {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {
        winningPlayer: player,
        gameResult: result
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.restartGame();
      else this.endTheGame();
    });
  } 

  restartGame(){
    this.buttonsPlayer1 = ['x', 'x', 'x', 'x', 'x'];
    this.buttonsPlayer2 = ['o', 'o', 'o', 'o', 'o'];

    this.winningPlayer = '';

    this.gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];

    this.refresh = true;
  }

  endTheGame() {
    this.router.navigate([`/`]);
  }
}

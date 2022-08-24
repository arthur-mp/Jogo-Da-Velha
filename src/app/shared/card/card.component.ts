import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnChanges{
  @Input()
  idCard: string;

  @Input()
  selectCard: string = '';

  @Input()
  refresh: boolean = false;

  @Input()
  allowedStatic: boolean = false;

  allowed: boolean = false;

  cardSelected: string = '';

  @Output()
  selected = new EventEmitter();

  constructor() {
    
  }

  ngOnInit(): void {
    this.initializeCard();
  }

  ngOnChanges(): void {
    if(this.refresh){
      this.restartGame();
    }
  }

  initializeCard() {
    if (this.allowedStatic) {
      this.cardSelected = this.selectCard;
    }
  }

  restartGame(){
    if(this.refresh) {
      this.refresh = false;
      this.cardSelected = '';
    }
  }

  public changeSelect() {
    let nextPlayer: boolean = false;
    if (
      !(
        (this.selectCard == 'x' || this.selectCard == 'o') &&
        (this.cardSelected == 'x' || this.cardSelected == 'o')
      )
    ) {
      this.cardSelected = this.selectCard;
      this.allowed = true;
      nextPlayer = true;
    }

    this.selected.emit({
      idCard: this.idCard,
      usedButton: this.selectCard,
      nextPlayer,
      refresh: this.refresh
    });
  }
}

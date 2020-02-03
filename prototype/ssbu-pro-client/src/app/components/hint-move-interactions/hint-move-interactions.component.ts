import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ssp-hint-move-interactions',
  templateUrl: './hint-move-interactions.component.html',
  styleUrls: ['./hint-move-interactions.component.scss']
})
export class HintMoveInteractionsComponent implements OnInit {
  splattershotEffectShown = {};
  @Input() moves: any[];

  constructor() { }

  ngOnInit() {
  }

  moveName(move) {
    if (move.prettyName) {
      return `${move.name} (${move.prettyName})`;
    }

    return move.name;
  }

  log(msg) {
    console.log(msg);
    return "";
  }

  toggleSplattershotClip(moveId: string) {
    this.splattershotEffectShown[moveId] = !this.splattershotEffectShown[moveId];
  }

}

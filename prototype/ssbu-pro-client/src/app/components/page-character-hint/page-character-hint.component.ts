import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { selectCharacterHintArray } from 'src/app/reducers/character/character.selectors';
import { CharacterHint } from 'src/app/@types/character-hint';
import { HintId } from 'src/app/@types/hint';

@Component({
  selector: 'ssp-page-character-hint',
  templateUrl: './page-character-hint.component.html',
  styleUrls: ['./page-character-hint.component.scss']
})
export class PageCharacterHintComponent implements OnInit {
  characterHints: Observable<CharacterHint[]> = this.store.pipe(select(selectCharacterHintArray));

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  get hintId() {
    return HintId;
  }

  isTextHint(hintId) {
    return hintId !== HintId.BooYah && hintId !== HintId.MoveInteractions;
  }

}

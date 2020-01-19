import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { CharacterMetadata } from 'src/app/@types/character-metadata';
import { selectCharacterMetadataArray } from 'src/app/reducers/character/character.selectors';
import { reduce } from 'lodash';
import { updateCharactersFilterIds } from 'src/app/reducers/character/character.actions';

@Component({
  selector: 'ssp-search-character',
  templateUrl: './search-character.component.html',
  styleUrls: ['./search-character.component.scss']
})
export class SearchCharacterComponent implements OnInit, OnDestroy {
  searchText: string;
  searchArray: CharacterMetadata[] = [];
  characterMetadataAsync: Observable<CharacterMetadata[]> = this.store.pipe(select(selectCharacterMetadataArray));
  metadataSubscription: Subscription;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.metadataSubscription = this.characterMetadataAsync.subscribe((metadataArray) => {
      this.searchArray = metadataArray;
    });
  }

  ngOnDestroy() {
    this.metadataSubscription.unsubscribe();
    this.store.dispatch(updateCharactersFilterIds({ filterIds: [] }));
  }

  updateFilterArray(event: string) {
    const filterIds = reduce(this.searchArray, (accumulator, c) => {
      if (event && c && c.name.toLowerCase().indexOf(event.toLowerCase()) > -1) {
        const characterId = (c.id.indexOf('POKEMON_TRAINER') > -1) ? 'POKEMON_TRAINER' : c.id;
        accumulator.push(characterId);
      }
      return accumulator;
    }, []);
    this.store.dispatch(updateCharactersFilterIds({ filterIds }));
  }

}

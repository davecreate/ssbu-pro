import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { State } from './reducers';
import {
  loadCharactersSortedIds,
  loadCharactersCropOffsets,
  loadCharactersMetadata,
  loadCharacterHint,
} from './reducers/character/character.actions';
import { HintId, HintName } from './@types/hint';
import { CharacterId } from './@types/character';
import { loadStages } from './reducers/stage/stage.actions';
import { Title, Meta } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { selectCharacterOGTags } from './reducers/character/character.selectors';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'ssp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  pageMetadata: Observable<any> = this.store.pipe(select(selectCharacterOGTags));
  pageMetadataSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private store: Store<State>,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platform: object,
  ) {}

  ngOnInit() {
    // Subscribe to the metadata so we can update OG Tags and title
    this.pageMetadataSubscription = this.pageMetadata.subscribe((metadata) => {
      this.titleService.setTitle(metadata.title);
      this.updateMetaTags(metadata);
    });

    // All data requests have to be absolute for SSR
    // SSR should only ever be used for pre-rendering
    const baseUrl = (isPlatformServer(this.platform)) ? 'http://localhost:4000' : '';

    this.http.get(`${baseUrl}/assets/sorted-ids.json`).subscribe((response: any) => {
      this.store.dispatch(loadCharactersSortedIds({ sortedIds: response.ids}));
    });

    this.http.get(`${baseUrl}/assets/crop-offsets.json`).subscribe((response: any) => {
      this.store.dispatch(loadCharactersCropOffsets({ offsets: response}));
    });

    this.http.get(`${baseUrl}/assets/metadata.json`).subscribe((response: any) => {
      this.store.dispatch(loadCharactersMetadata({ metadata: response}));
    });

    this.http.get(`${baseUrl}/assets/stages.json`).subscribe((response: any) => {
      this.store.dispatch(loadStages({ stages: response}));
    });

    this.http.get(`${baseUrl}/assets/boo-yah.json`).subscribe((response: any) => {
      this.store.dispatch(loadCharacterHint({
        characterId: CharacterId.Inkling,
        hint: {
          id: HintId.BooYah,
          name: HintName.BooYah,
          data: response,
        },
      }));
    });

    this.http.get(`${baseUrl}/assets/smash-after-roller.json`).subscribe((response: any) => {
      this.store.dispatch(loadCharacterHint({
        characterId: CharacterId.Inkling,
        hint: {
          id: HintId.SmashAfterRoller,
          name: HintName.SmashAfterRoller,
          data: response,
        },
      }));
    });

    this.http.get(`${baseUrl}/assets/dsmash-on-ledge.json`).subscribe((response: any) => {
      this.store.dispatch(loadCharacterHint({
        characterId: CharacterId.Inkling,
        hint: {
          id: HintId.DSmashOnLedge,
          name: HintName.DSmashOnLedge,
          data: response,
        },
      }));
    });

    this.http.get(`${baseUrl}/assets/sh-fair-hits.json`).subscribe((response: any) => {
      this.store.dispatch(loadCharacterHint({
        characterId: CharacterId.Inkling,
        hint: {
          id: HintId.SHFairHits,
          name: HintName.SHFairHits,
          data: response,
        },
      }));
    });

    this.http.get(`${baseUrl}/assets/move-interactions.json`).subscribe((response: any) => {
      this.store.dispatch(loadCharacterHint({
        characterId: CharacterId.Inkling,
        hint: {
          id: HintId.MoveInteractions,
          name: HintName.MoveInteractions,
          data: response,
        },
      }));
    });
  }

  updateMetaTags({ title, ogDescription, ogImage}) {
    this.metaService.updateTag({ name: 'description', content: ogDescription });
    this.metaService.updateTag({ name: 'og:title', content: title });
    this.metaService.updateTag({ name: 'og:description', content: ogDescription });
    this.metaService.updateTag({ name: 'og:image', content: ogImage });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: ogDescription });
    this.metaService.updateTag({ name: 'twitter:image', content: `https://ssbu.pro${ogImage}` });
  }

  ngOnDestroy() {
    this.pageMetadataSubscription.unsubscribe();
  }
}

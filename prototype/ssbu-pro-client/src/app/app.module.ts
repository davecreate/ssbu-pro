import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AngularResizedEventModule } from 'angular-resize-event';
import { AppComponent } from './app.component';
import { DebugCharacterCropperComponent } from './components/debug-character-cropper/debug-character-cropper.component';
import { CharacterCropComponent } from './components/character-crop/character-crop.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CharactersGridComponent } from './components/characters-grid/characters-grid.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { PageCharacterSelectorComponent } from './components/page-character-selector/page-character-selector.component';
import { PageCharacterHintComponent } from './components/page-character-hint/page-character-hint.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HintPercentWithStageComponent } from './components/hint-percent-with-stage/hint-percent-with-stage.component';
import { LinkCreditsComponent } from './components/link-credits/link-credits.component';
import { SectionTopComponent } from './components/section-top/section-top.component';
import { LinkBackComponent } from './components/link-back/link-back.component';
import { SearchCharacterComponent } from './components/search-character/search-character.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { TextWithImageComponent } from './components/text-with-image/text-with-image.component';
import { PageCreditsComponent } from './components/page-credits/page-credits.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HintMoveInteractionsComponent } from './components/hint-move-interactions/hint-move-interactions.component';

@NgModule({
  declarations: [
    AppComponent,
    DebugCharacterCropperComponent,
    CharacterCropComponent,
    CharactersGridComponent,
    CharacterCardComponent,
    PageCharacterSelectorComponent,
    PageCharacterHintComponent,
    HintPercentWithStageComponent,
    LinkCreditsComponent,
    SectionTopComponent,
    LinkBackComponent,
    SearchCharacterComponent,
    PageTitleComponent,
    TextWithImageComponent,
    PageCreditsComponent,
    HintMoveInteractionsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    AngularResizedEventModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

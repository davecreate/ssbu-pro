import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  PageCharacterSelectorComponent,
} from './components/page-character-selector/page-character-selector.component';
import { PageCharacterHintComponent } from './components/page-character-hint/page-character-hint.component';
import { PageCreditsComponent } from './components/page-credits/page-credits.component';


const routes: Routes = [
  {
    path: 'inkling/vs/:dashedId',
    component: PageCharacterHintComponent,
  },
  {
    path: 'inkling',
    component: PageCharacterSelectorComponent,
  },
  {
    path: 'inkling/vs',
    redirectTo: '/inkling'
  },
  {
    path: 'credits',
    component: PageCreditsComponent,
  },
  {
    path: '',
    redirectTo: '/inkling',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { selectIsMatchupPage, selectIsCreditsPage } from 'src/app/reducers/router/router.selectors';

@Component({
  selector: 'ssp-section-top',
  templateUrl: './section-top.component.html',
  styleUrls: ['./section-top.component.scss']
})
export class SectionTopComponent implements OnInit {
  isCreditsPage: Observable<boolean> = this.store.pipe(select(selectIsCreditsPage));
  isMatchupPage: Observable<boolean> = this.store.pipe(select(selectIsMatchupPage));

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

}

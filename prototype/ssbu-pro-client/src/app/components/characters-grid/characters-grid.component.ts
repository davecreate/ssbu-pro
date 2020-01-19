import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewChecked,
  HostListener,
  NgZone,
  AfterViewInit,
  ChangeDetectorRef,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { CharacterGridEntry } from 'src/app/@types/character-grid';
import { Observable } from 'rxjs';
import { selectCharacterGridEntries } from 'src/app/reducers/character/character.selectors';

@Component({
  selector: 'ssp-characters-grid',
  templateUrl: './characters-grid.component.html',
  styleUrls: ['./characters-grid.component.scss']
})
export class CharactersGridComponent implements OnInit, AfterViewChecked, AfterViewInit {
  bgLineWidth = 0;
  bgLineHeight = 0;
  entries: Observable<CharacterGridEntry[]> = this.store.pipe(select(selectCharacterGridEntries));
  loaded = false;
  @ViewChildren('characterEntry') characterEntry !: QueryList<ElementRef>;

  constructor(
    private store: Store<State>,
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platform: object,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.setBgLinesSize();
        this.cd.detectChanges();
      }, 0);
    });
  }

  ngAfterViewChecked() {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.setBgLinesSize();
        this.cd.detectChanges();
      }, 0);
    });
  }

  setBgLinesSize() {
    const moduloEntry = this.characterEntry.length % 6;
    if (moduloEntry > 0 && this.characterEntry.first.nativeElement) {
      const gridElementWidth = this.characterEntry.first.nativeElement.offsetWidth;
      this.bgLineWidth = ((6 - moduloEntry) * 0.5) * gridElementWidth;
      this.bgLineHeight = this.characterEntry.first.nativeElement.offsetHeight;
    }
  }

  dasherizedUrl(id: string) {
    return `/inkling/vs/${id.toLowerCase().replace(/_/g, '-')}`;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setBgLinesSize();
  }

}

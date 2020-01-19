import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCharacterComponent } from './search-character.component';

describe('SearchCharacterComponent', () => {
  let component: SearchCharacterComponent;
  let fixture: ComponentFixture<SearchCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

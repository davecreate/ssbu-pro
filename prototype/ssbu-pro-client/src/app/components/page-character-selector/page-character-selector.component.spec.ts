import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCharacterSelectorComponent } from './page-character-selector.component';

describe('PageCharacterSelectorComponent', () => {
  let component: PageCharacterSelectorComponent;
  let fixture: ComponentFixture<PageCharacterSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCharacterSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCharacterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

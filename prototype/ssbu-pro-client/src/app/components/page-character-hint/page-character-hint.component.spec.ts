import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCharacterHintComponent } from './page-character-hint.component';

describe('PageCharacterHintComponent', () => {
  let component: PageCharacterHintComponent;
  let fixture: ComponentFixture<PageCharacterHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCharacterHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCharacterHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

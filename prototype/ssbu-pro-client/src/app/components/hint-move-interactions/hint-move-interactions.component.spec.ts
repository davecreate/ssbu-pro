import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HintMoveInteractionsComponent } from './hint-move-interactions.component';

describe('HintMoveInteractionsComponent', () => {
  let component: HintMoveInteractionsComponent;
  let fixture: ComponentFixture<HintMoveInteractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HintMoveInteractionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HintMoveInteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

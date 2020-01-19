import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HintPercentWithStageComponent } from './hint-percent-with-stage.component';

describe('HintPercentWithStageComponent', () => {
  let component: HintPercentWithStageComponent;
  let fixture: ComponentFixture<HintPercentWithStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HintPercentWithStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HintPercentWithStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

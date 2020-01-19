import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugCharacterCropperComponent } from './debug-character-cropper.component';

describe('DebugCharacterCropperComponent', () => {
  let component: DebugCharacterCropperComponent;
  let fixture: ComponentFixture<DebugCharacterCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebugCharacterCropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugCharacterCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCropComponent } from './character-crop.component';

describe('CharacterCropComponent', () => {
  let component: CharacterCropComponent;
  let fixture: ComponentFixture<CharacterCropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterCropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

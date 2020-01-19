import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithImageComponent } from './text-with-image.component';

describe('TextWithImageComponent', () => {
  let component: TextWithImageComponent;
  let fixture: ComponentFixture<TextWithImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextWithImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWithImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

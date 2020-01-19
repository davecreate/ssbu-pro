import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTopComponent } from './section-top.component';

describe('SectionTopComponent', () => {
  let component: SectionTopComponent;
  let fixture: ComponentFixture<SectionTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

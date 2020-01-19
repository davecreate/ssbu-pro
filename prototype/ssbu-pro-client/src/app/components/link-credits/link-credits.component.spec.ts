import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCreditsComponent } from './link-credits.component';

describe('LinkCreditsComponent', () => {
  let component: LinkCreditsComponent;
  let fixture: ComponentFixture<LinkCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

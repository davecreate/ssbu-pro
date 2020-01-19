import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreditsComponent } from './page-credits.component';

describe('PageCreditsComponent', () => {
  let component: PageCreditsComponent;
  let fixture: ComponentFixture<PageCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

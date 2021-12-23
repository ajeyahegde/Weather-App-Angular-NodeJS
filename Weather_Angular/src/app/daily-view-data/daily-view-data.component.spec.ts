import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyViewDataComponent } from './daily-view-data.component';

describe('DailyViewDataComponent', () => {
  let component: DailyViewDataComponent;
  let fixture: ComponentFixture<DailyViewDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyViewDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyViewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

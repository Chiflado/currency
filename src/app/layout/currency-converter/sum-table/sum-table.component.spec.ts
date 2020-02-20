import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumTableComponent } from './sum-table.component';

describe('SumTableComponent', () => {
  let component: SumTableComponent;
  let fixture: ComponentFixture<SumTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

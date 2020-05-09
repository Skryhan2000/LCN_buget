import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitPageComponent } from './profit-page.component';

describe('ProfitPageComponent', () => {
  let component: ProfitPageComponent;
  let fixture: ComponentFixture<ProfitPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

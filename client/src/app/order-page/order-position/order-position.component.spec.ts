import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPositionComponent } from './order-position.component';

describe('OrderPositionComponent', () => {
  let component: OrderPositionComponent;
  let fixture: ComponentFixture<OrderPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

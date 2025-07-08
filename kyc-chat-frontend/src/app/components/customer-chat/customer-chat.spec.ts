import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChat } from './customer-chat';

describe('CustomerChat', () => {
  let component: CustomerChat;
  let fixture: ComponentFixture<CustomerChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

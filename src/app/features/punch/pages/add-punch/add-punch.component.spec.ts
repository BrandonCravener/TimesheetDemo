import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPunchComponent } from './add-punch.component';

describe('AddPunchComponent', () => {
  let component: AddPunchComponent;
  let fixture: ComponentFixture<AddPunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPunchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

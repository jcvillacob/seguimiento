import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearCreditoComponent } from './modal-crear-credito.component';

describe('ModalCrearCreditoComponent', () => {
  let component: ModalCrearCreditoComponent;
  let fixture: ComponentFixture<ModalCrearCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCrearCreditoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCrearCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

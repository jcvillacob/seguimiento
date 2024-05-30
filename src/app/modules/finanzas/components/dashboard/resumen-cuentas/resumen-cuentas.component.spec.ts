import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCuentasComponent } from './resumen-cuentas.component';

describe('ResumenCuentasComponent', () => {
  let component: ResumenCuentasComponent;
  let fixture: ComponentFixture<ResumenCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenCuentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

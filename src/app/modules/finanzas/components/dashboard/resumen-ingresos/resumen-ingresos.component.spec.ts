import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenIngresosComponent } from './resumen-ingresos.component';

describe('ResumenIngresosComponent', () => {
  let component: ResumenIngresosComponent;
  let fixture: ComponentFixture<ResumenIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenIngresosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

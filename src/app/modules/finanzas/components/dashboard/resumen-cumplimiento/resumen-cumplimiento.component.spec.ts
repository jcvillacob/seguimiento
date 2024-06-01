import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCumplimientoComponent } from './resumen-cumplimiento.component';

describe('ResumenCumplimientoComponent', () => {
  let component: ResumenCumplimientoComponent;
  let fixture: ComponentFixture<ResumenCumplimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenCumplimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenCumplimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

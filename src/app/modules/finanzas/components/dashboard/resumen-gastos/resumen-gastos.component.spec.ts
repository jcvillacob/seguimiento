import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenGastosComponent } from './resumen-gastos.component';

describe('ResumenGastosComponent', () => {
  let component: ResumenGastosComponent;
  let fixture: ComponentFixture<ResumenGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenGastosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

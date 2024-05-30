import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenBalanceMesComponent } from './resumen-balance-mes.component';

describe('ResumenBalanceMesComponent', () => {
  let component: ResumenBalanceMesComponent;
  let fixture: ComponentFixture<ResumenBalanceMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenBalanceMesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenBalanceMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResumenComponent } from './dashboard-resumen.component';

describe('DashboardResumenComponent', () => {
  let component: DashboardResumenComponent;
  let fixture: ComponentFixture<DashboardResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardResumenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenBalanceUltimosComponent } from './resumen-balance-ultimos.component';

describe('ResumenBalanceUltimosComponent', () => {
  let component: ResumenBalanceUltimosComponent;
  let fixture: ComponentFixture<ResumenBalanceUltimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenBalanceUltimosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenBalanceUltimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

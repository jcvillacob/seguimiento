import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCardsComponent } from './resumen-cards.component';

describe('ResumenCardsComponent', () => {
  let component: ResumenCardsComponent;
  let fixture: ComponentFixture<ResumenCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

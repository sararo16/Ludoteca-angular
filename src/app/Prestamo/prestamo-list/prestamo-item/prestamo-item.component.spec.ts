import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoItemComponent } from './prestamo-item.component';

describe('PrestamoItemComponent', () => {
  let component: PrestamoItemComponent;
  let fixture: ComponentFixture<PrestamoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestamoItemComponent]
    });
    fixture = TestBed.createComponent(PrestamoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueCareComponent } from './due-care.component';

describe('DueCareComponent', () => {
  let component: DueCareComponent;
  let fixture: ComponentFixture<DueCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueCareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

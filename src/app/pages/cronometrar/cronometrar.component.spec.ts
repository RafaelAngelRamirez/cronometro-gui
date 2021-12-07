import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronometrarComponent } from './cronometrar.component';

describe('CronometrarComponent', () => {
  let component: CronometrarComponent;
  let fixture: ComponentFixture<CronometrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CronometrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CronometrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

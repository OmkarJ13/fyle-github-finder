import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatePageComponent } from './navigate-page.component';

describe('NavigatePageComponent', () => {
  let component: NavigatePageComponent;
  let fixture: ComponentFixture<NavigatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

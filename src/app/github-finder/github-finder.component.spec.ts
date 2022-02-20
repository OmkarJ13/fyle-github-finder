import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubFinderComponent } from './github-finder.component';

describe('GithubFinderComponent', () => {
  let component: GithubFinderComponent;
  let fixture: ComponentFixture<GithubFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubFinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCompetitionComponent } from './display-competition.component';

describe('DisplayCompetitionComponent', () => {
  let component: DisplayCompetitionComponent;
  let fixture: ComponentFixture<DisplayCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCompetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

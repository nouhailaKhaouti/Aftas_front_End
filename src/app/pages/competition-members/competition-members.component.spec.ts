import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionMembersComponent } from './competition-members.component';

describe('CompetitionMembersComponent', () => {
  let component: CompetitionMembersComponent;
  let fixture: ComponentFixture<CompetitionMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCompetitionsComponent } from './member-competitions.component';

describe('MemberCompetitionsComponent', () => {
  let component: MemberCompetitionsComponent;
  let fixture: ComponentFixture<MemberCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCompetitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

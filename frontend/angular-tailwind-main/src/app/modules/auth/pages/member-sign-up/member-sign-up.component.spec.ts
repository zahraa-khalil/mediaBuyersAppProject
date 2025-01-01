import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSignUpComponent } from './member-sign-up.component';

describe('MemberSignUpComponent', () => {
  let component: MemberSignUpComponent;
  let fixture: ComponentFixture<MemberSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

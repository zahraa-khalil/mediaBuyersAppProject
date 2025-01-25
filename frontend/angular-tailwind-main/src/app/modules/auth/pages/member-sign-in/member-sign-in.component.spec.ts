import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSignInComponent } from './member-sign-in.component';

describe('MemberSignInComponent', () => {
  let component: MemberSignInComponent;
  let fixture: ComponentFixture<MemberSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberSignInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

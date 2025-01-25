import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsListComponent } from './campaigns-list.component';

describe('CampaignsListComponent', () => {
  let component: CampaignsListComponent;
  let fixture: ComponentFixture<CampaignsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

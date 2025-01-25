import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftBarChartCardComponent } from './nft-bar-chart-card.component';

describe('NftBarChartCardComponent', () => {
  let component: NftBarChartCardComponent;
  let fixture: ComponentFixture<NftBarChartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NftBarChartCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NftBarChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

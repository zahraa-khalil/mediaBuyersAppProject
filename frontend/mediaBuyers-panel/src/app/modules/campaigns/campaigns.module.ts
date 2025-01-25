import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsListComponent } from './campaigns-list/campaigns-list.component';
import { TableFooterComponent } from '../uikit/pages/table/components/table-footer/table-footer.component';
import { TableActionComponent } from '../uikit/pages/table/components/table-action/table-action.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [CampaignsListComponent],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    TableFooterComponent,
    TableActionComponent,
    AngularSvgIconModule
  ]
})
export class CampaignsModule { }

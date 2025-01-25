import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsListComponent } from './campaigns-list/campaigns-list.component';

const routes: Routes = [
  { path: 'list', component: CampaignsListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }

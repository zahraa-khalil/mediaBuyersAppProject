import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersListComponent } from './members-list/members-list.component';
import { AddMembersComponent } from './add-members/add-members.component';


const routes: Routes = [
  { path: 'list', component: MembersListComponent },
  { path: '', component: AddMembersComponent, pathMatch: 'full'},


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }

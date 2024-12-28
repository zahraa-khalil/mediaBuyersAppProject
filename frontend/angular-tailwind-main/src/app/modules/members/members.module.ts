import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersRoutingModule } from './members-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMembersComponent } from './add-members/add-members.component';
import { MembersListComponent } from './members-list/members-list.component';
import { TableFooterComponent } from '../uikit/pages/table/components/table-footer/table-footer.component';


@NgModule({
  declarations: [AddMembersComponent, MembersListComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    TableFooterComponent
  ]
})
export class MembersModule { }

import { Component } from '@angular/core';
import { toast } from 'ngx-sonner';
import { Member } from 'src/app/core/models/member.model';
import { MembersService } from 'src/app/services/members/members.service';
import { TableFilterService } from '../../uikit/pages/table/services/table-filter.service';
import { CampaignsService } from 'src/app/services/campaigns/campaigns.service';

@Component({
  selector: 'app-campaigns-list',
  standalone: false,
  templateUrl: './campaigns-list.component.html',
  styleUrl: './campaigns-list.component.scss',
})
export class CampaignsListComponent {
  paginatedMembers: Member[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  companyId: any = localStorage.getItem('companyId');

  members: Member[] = [];
  filteredInsightsItemsLength: number = 0;
  adAccounts: any[] = [];
  campaigns: any[] = [];
  insights: any[] = [];
  localInsights: any;
  filteredInsights: any;
  localAdAccounts: any;
  selectedAdAccount: string = '';
  isModalVisible = false;

  objectiveActionMap: { [key: string]: string } = {
    OUTCOME_LEADS: 'lead',
    POST_ENGAGEMENT: 'post_engagement',
    LINK_CLICKS: 'link_click',
    PAGE_ENGAGEMENT: 'page_engagement',
    VIDEO_VIEWS: 'video_view',
  };
  hoveredRow: any = null;

  constructor(private svc: CampaignsService, public filterService: TableFilterService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.getAdAccounts();
    // this.localInsights =localStorage.getItem('insights');
    this.localInsights = JSON.parse(localStorage.getItem('insights') || '[]');
    this.filteredInsights = this.localInsights
    this.filteredInsightsItemsLength = this.filteredInsights.length;
    // this.getActionValueByObjective( this.filteredInsights)
    this.localAdAccounts = JSON.parse(localStorage.getItem('adAccounts') || '[]');

  }

  onHover(row: any): void {
    this.hoveredRow = row;
  }


  getActionValueByObjective(campaign: any): string {
    const actionType = this.objectiveActionMap[campaign.objective];
    const action = campaign.actions.find((a: any) => a.action_type === actionType);
    return action ? action.value : '0'; // Default to '0' if no action is found
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.members.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedMembers = this.members.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  removeMember(data: Member) {
    console.log('Removing member:');
  }

  // getAdAccounts

  getAdAccounts() {
    this.svc.getAdAccounts(this.companyId).subscribe({
      next: (response: any) => {
        this.adAccounts = response.adAccounts.data;
        console.log('data retrieved successfully', this.adAccounts);
        localStorage.setItem('adAccounts', JSON.stringify(this.adAccounts));
        console.log('adAccounts retrieved successfully', this.adAccounts.length);
        this.updatePagination();
        // this.handleRequestSuccess(response);
        // localStorage.setItem('companyId', response.id);
        // this._router.navigate(['../dashboard']);
      },
      error: (error: any) => {
        console.error('Error', error);
        this.handleRequestError(error);
      },
      complete: () => {},
    });
  }

  updateAdAccounts(){
    this.getAdAccounts();
  }

  updateInsights(){
    this.getInsightsByAdAccount( this.selectedAdAccount );

  }



  getInsightsByAdAccount(adAccountId: any) {
    let timeRange = {
      since: '2024-12-01',
      until: '2024-12-31',
    }
    this.svc.getInsigntsByAdAccount(adAccountId, this.companyId, timeRange).subscribe({
      next: (response: any) => {
        this.insights = response.insights;
        localStorage.setItem('insights', JSON.stringify(this.insights));
        this.filteredInsights = this.insights;

        console.log('INSIGHTS retrieved successfully', this.insights.length);
        this.updatePagination();
        // this.handleRequestSuccess(response);
        // localStorage.setItem('companyId', response.id);
        // this._router.navigate(['../dashboard']);
      },
      error: (error: any) => {
        console.error('Error', error);
        this.handleRequestError(error);
      },
      complete: () => {},
    });
  }

  onAdAccountChange(value: Event) {
    const input = value.target as HTMLInputElement;
    console.log('adAccount selected', input.value);
    this.selectedAdAccount = input.value;
    console.log('selectedAdAccount', this.selectedAdAccount);
    // this.getInsightsByAdAccount( this.selectedAdAccount );/
  }



  private handleRequestSuccess(response: any) {
    // const msg = 'An error occurred while fetching users. Loading dummy data as fallback.';
    const msg = 'Data retrieved Successfully.';
    toast.success(msg, {
      position: 'bottom-right',
      description: response.message,
      action: {
        label: 'Close',
        onClick: () => console.log('Action!'),
      },
      actionButtonStyle: 'background-color:#0e6b05; color:white;',
    });
  }

  private handleRequestError(error: any) {
    // const msg = 'An error occurred while fetching users. Loading dummy data as fallback.';
    const msg = 'An error occurred.';
    toast.error(msg, {
      position: 'bottom-right',
      description: error.message,
      action: {
        label: 'Close',
        onClick: () => console.log('Action!'),
      },
      actionButtonStyle: 'background-color:#DC2626; color:white;',
    });
  }

  // search
  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
    this.filterService.searchField.set(input.value);
  }

  onStatusChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    this.filterService.statusField.set(selectElement.value);
  }

  onOrderChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    this.filterService.orderField.set(selectElement.value);
  }

  onChangeStatus(value: Event){
    const selectedElement = value.target as HTMLSelectElement;
    const selectedStatus = selectedElement.value ;
    console.log(" selectedStatus ", selectedStatus )

    if(selectedStatus === 'All'){
      this.filteredInsights = this.localInsights;
    }else{
      this.filteredInsights = this.localInsights.filter(
        (insight: any) => insight.campaign_status === selectedStatus
      );
    }

  }






  toggleModal(show: boolean): void {
    this.isModalVisible = show;
  }
}

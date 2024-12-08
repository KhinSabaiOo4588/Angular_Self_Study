import { Component, TemplateRef } from '@angular/core';
import { ResourceService } from '../../../services/resource-services/resource.service';
import { Resource } from '../../../models/resource/resource.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';
import { Router } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'resource-list',
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // Ensure HttpClientModule is imported here
    PaginationComponent,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class ResourceListComponent {


  resourceShow: boolean = false;
  showBookingsList: boolean = false;
  projectForm!: FormGroup;
  // locations: any;
  // statuslist: any;


  // Resources 
  resources: Resource[] = [];
  resource!: Resource;
  selectedResourceId!: number;

  paginatedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15];
  searchQuery: string = '';
  resourceForm!: FormGroup;

  constructor(private modalService: NgbModal, private resourceService: ResourceService, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.loadResource();
  }



  backToResources(resourceShow: boolean) {
    this.resourceShow = !resourceShow;
  }



  loadResource() {
    this.resourceService.getResources().then(
      (data: Resource[]) => {
        this.resources = data;
        console.log(this.resources);
        this.updatePaginatedItems();
      },
      (error) => {
        console.log("Error in Fetching Resources", error);
      }
    );
  }




  updatePaginatedItems() {
    const filteredItems = this.searchQuery
      ? this.resources.filter(item =>
        Object.values(item).some(val =>
          val !== null && val !== undefined && val.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
      : this.resources;

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedItems = filteredItems.slice(start, end);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  onItemsPerPageChanged(event: Event) {
    const newItemsPerPage = Number((event.target as HTMLSelectElement).value);
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1; // Reset to the first page
    this.updatePaginatedItems();
  }

  onSearchQueryChanged(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage = 1; // Reset to the first page
    this.updatePaginatedItems();
  }

  createResource() {
    // Logic to add a new resource (this could be a form to create a new resource)
    this.router.navigate(['home/resource/create-resource']);
    console.log('Add Resource button clicked');
  }

  updateResource(resourceId: number) {
    this.router.navigate(['home/resource/update-resource', resourceId]);
    console.log('Update Resource clicked')
  }


  openDeleteModal(content: TemplateRef<any>, id: number) {
    this.selectedResourceId = id;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
        },
        (reason) => {
          console.log(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === 'Cross click') {
      return 'by clicking on a cross';
    } else if (reason === 'cancel click') {
      return 'by clicking on cancel';
    } else {
      return `with: ${reason}`;
    }
  }

  confirmDelete() {
    this.resourceService.deleteResource(this.selectedResourceId).then(
      () => {
        this.loadResource();
      },
      (error) => console.error('Error deleting Resource', error)
    );
  }


  routeToDetails(resource: Resource) {
    this.resourceShow = true
    this.resource = resource
  }

}

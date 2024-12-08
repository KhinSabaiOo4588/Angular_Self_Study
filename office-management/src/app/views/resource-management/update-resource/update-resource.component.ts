import { Component } from '@angular/core';
import { Resource } from '../../../models/resource/resource.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../../services/resource-services/resource.service';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

const LocationsList = [
  { id: 0, name: '1203' },
  { id: 1, name: '1202' },
  { id: 2, name: '1202 First Floor' },
  { id: 3, name: '1202 Second Floor' },
  { id: 4, name: '1203 First Floor' },
  { id: 5, name: '1203 Second Floor' }

];

const ResourceType = [
  { id: 0, name: 'Office Furniture' },
  { id: 1, name: 'Room' },
  { id: 2, name: 'Printing and Scanning Equipment' },
  { id: 3, name: 'Office Supplies' },
  { id: 4, name: 'Storage Solutions' },
  { id: 5, name: 'Cleaning and Maintenance Supplies' },
  { id: 6, name: 'Miscellaneous Equipment' },
  { id: 7, name: 'Breakroom Supplies' },
  { id: 8, name: 'Communication Equipment' }
]

const StatusList = [
  { id: 0, name: 'Avaliable' },
  { id: 1, name: 'Not Avaliable' }

];
@Component({
  selector: 'app-update-resource',
  templateUrl: './update-resource.component.html',
  styleUrl: './update-resource.component.css',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})

export class UpdateResourceComponent {

  resourceForm!: FormGroup;
  resource!: Resource;
  resourceId!: number;
  statusList = StatusList// Status Array
  locationsList = LocationsList;
  types = ResourceType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.resourceForm = this.fb.group({
      id: ['', Validators.required],
      resourceName: ['', Validators.required],
      type: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required]

    });
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.resourceId = params['id'];
      this.loadResource();
    });
  }
  loadResource() {
    this.resourceService.getResourceById(this.resourceId).then((data) => {

      this.resourceForm.patchValue(data)
      console.log("Resource get Successful", data)
    })
      .catch((error) => {
        console.error('Error loading resource:', error);
      });
  }

  onSubmit() {
    if (this.resourceForm.valid) {
      const formData = this.resourceForm.value;

      this.resourceService.updateResource(this.resourceId, formData).then(
        () => {
          console.log('Update Successful!');
        },
        (error) => {
          console.error("Error in Updating Resource", error);
        }
      );
      this.location.back();
    } else {
      alert('Update Error')
      this.router.navigate(['resource/update-resource', this.resourceId]);
    }

  }

  goBack() {
    this.location.back();
  }

}

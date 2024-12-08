import { CommonModule, NgStyle } from '@angular/common';
import { Component, NgModule, } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ResourceService } from '../../../services/resource-services/resource.service';
import { Router } from '@angular/router';

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
  { id: 8, name: 'Communication Equipment'}
]

const StatusList = [
  { id: 0, name: 'Avaliable' },
  { id: 1, name: 'Not Avaliable' }

];

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrl: './create-resource.component.css',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NgStyle,
    ReactiveFormsModule
  ]
})
export class CreateResourceComponent {

  statusList = StatusList// Status Array
  locationsList = LocationsList;
  types = ResourceType;
  createResourceForm!: FormGroup;

  constructor(private fb: FormBuilder, private location: Location, private router: Router, private resourceService: ResourceService) {
    this.createResourceForm = this.fb.group({
      resourceName: ['', Validators.required],
      type: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(this.createResourceForm.value);
    if (this.createResourceForm.valid) {
      this.resourceService.createResource(this.createResourceForm.value).then(
        () => {
          this.location.back();
          // this.router.navigate(['/home/resource']);
        },
        (error) => console.error('Error adding Resource', error)
      );
    }
  }
 
  goBack() {
    this.location.back();
}

}

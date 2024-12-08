import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent {
  isModalVisible: boolean = false;

  // Input properties to receive data from the parent component
  @Input() badGuys: string[] = [];
  @Input() courses: string[] = [];

  @Output() formSubmitted = new EventEmitter<any>();

  // Open the modal
  openModal(): void {
    this.isModalVisible = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalVisible = false;
  }

  // Method to handle form submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formSubmitted.emit(form.value); // Emit the form data to the parent
      this.closeModal(); // Close the modal after form submission
    }
  }
}

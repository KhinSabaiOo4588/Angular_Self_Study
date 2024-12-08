import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './custom.validator';

@Component({
  templateUrl: './hello.component.html',
  styles: [
  ]
})
export class HelloComponent {

  message = new FormControl('', [
    Validators.required,
    CustomValidators.forbitNames('admin', 'root', 'superuser'),
    Validators.minLength(10)
  ])

  messageValue = ''

  send() {
    this.messageValue = this.message.value!;

  }

}

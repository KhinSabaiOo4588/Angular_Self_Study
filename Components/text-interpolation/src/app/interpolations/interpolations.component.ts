import { Component } from '@angular/core';

@Component({
  selector: 'app-interpolations',
  templateUrl: './interpolations.component.html',
  styleUrls: ['./interpolations.component.css']
})
export class InterpolationsComponent {

  //Which Parts
  //Properties(Bindigns, Variable)

  //String Type
  title:string = "Text Interpolations"

  //Number
  data = Number.MAX_VALUE

  //Date Type
  date = new Date

  //Custom Object
  person = {
    firstName: 'Khin',
    lastName: 'Sabai Oo'
  }

  //Getter
  get PersonName():string{
    return `${this.person.firstName} ${this.person.lastName}`
  }
  
  //Method With Return Type
  sayHello(name:string){
    return `Hello ${name}`
  }
  //Data Types
}

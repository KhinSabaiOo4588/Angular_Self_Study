import { Component } from '@angular/core';
import { Message, MessageRepository } from '../resources/message.resources';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  list:Message[]

  constructor(repo:MessageRepository){
    //const repo = new MessageRepository
    this.list = repo.getAll()
  }
}

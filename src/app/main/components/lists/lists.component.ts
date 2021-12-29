import { Component, Input, OnInit } from '@angular/core';
import { Models } from '../../models/Entity';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
 @Input() dataInput : Models[] = [];
  constructor() { }

  ngOnInit(): void {
    console.log(this.dataInput)
  }

  removeObject(id: number | undefined , event: Event) {
    event.preventDefault();
    this.dataInput = this.dataInput.filter(obj => obj.id !== id);
  }
}

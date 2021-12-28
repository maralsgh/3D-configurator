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

}

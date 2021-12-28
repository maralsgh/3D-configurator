import { Component, OnInit } from '@angular/core';
import { Models } from '../../models/Entity';
import { ModelService } from '../../services/model.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  dataList : Models[] = [];
  constructor(private lists: ModelService) { }

  ngOnInit(): void {
    this.lists.get().then(data => {
      this.dataList = data.models;
    })
  }

}

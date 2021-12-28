import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { TemplateComponent } from './components/template/template.component';
import { ListsComponent } from './components/lists/lists.component';
import { ModelService} from './services/model.service'
import { BrowserModule } from '@angular/platform-browser';
import { ObjectComponent } from './components/object/object.component';


@NgModule({
  declarations: [
    TemplateComponent,
    ListsComponent,
    ObjectComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  providers:[ModelService]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectComponent } from './components/object/object.component';
import { TemplateComponent } from './components/template/template.component';

const routes: Routes = [
  {path: '' , component: TemplateComponent ,  children:[
      {path: 'object/:id' , component: ObjectComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

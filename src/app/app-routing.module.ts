import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogComponent } from './views/log/log.component';
import { MainComponent } from './views/main/main.component';

const routes: Routes = [
  {
    path:'',
    component: LogComponent
  },
  {
    path:'tabuleiro',
    component: MainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

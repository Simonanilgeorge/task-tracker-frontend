import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StocksComponent} from './components/stocks/stocks.component'
 
const routes: Routes = [
  {path:'',pathMatch:'full',component: StocksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

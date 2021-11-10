import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './components/stocks/stocks.component'
import { ExpensesComponent } from './components/expenses/expenses.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StocksComponent },
  {path:'stocks',component:StocksComponent},
  {path:'expenses',component:ExpensesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './components/stocks/stocks.component'
import { ExpensesComponent } from './components/expenses/expenses.component'
import {LoginComponent} from './components/login/login.component'
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  {path:'stocks',component:StocksComponent,canActivate:[AuthGuard]},
  {path:'expenses',component:ExpensesComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

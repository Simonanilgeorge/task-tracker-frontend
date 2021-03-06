import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { TableComponent } from './components/table/table.component';
import { ToastComponent } from './components/toast/toast.component';
import { ModalComponent } from './components/modal/modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StocksComponent,
    TableComponent,
    ToastComponent,
    ModalComponent,
    ExpensesComponent,
    DropdownComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule

  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

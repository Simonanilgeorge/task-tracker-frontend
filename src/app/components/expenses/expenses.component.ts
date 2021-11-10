import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ExpensesService } from '../../services/expenses.service'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {



  data=[]

  modal = {
    open: false,
    message: null,
    data: null
  }

  toast = {
    active: false,
    message: null,
    severity: null
  }
  additionalFeatures = {
    grandTotal: {
      enabled: false,
      keys: []
    },
    sort: true,
    delete: false
  }




  form = this.fb.group({
    name: [{ value: "", disabled: false }, Validators.required],
    amount: [{ value: null, disabled: false }, Validators.required]
  })

  constructor(private fb: FormBuilder, private expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.getAllExpenses()
  }


  addExpense() {
    console.log(this.form.getRawValue())
    this.expensesService.addExpense(this.form.getRawValue()).subscribe((res)=>{
      console.log(res)
      this.form.reset()
      this.showToastMessage(res.message,"success")
      this.getAllExpenses()
    })
  }

  getAllExpenses() {
    this.expensesService.getAllExpenses().subscribe((res) => {
      this.data=res.message
      console.log(this.data)
    })
  }


  getStats(data){

  }
  openModal(data){

  }

  delete(data){

  }

  showToastMessage(message, severity) {

    this.toast = JSON.parse(JSON.stringify({
      message: message,
      severity: severity,
      active: true
    }))

  }

}

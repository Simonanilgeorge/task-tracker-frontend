import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';

import { ExpensesService } from '../../services/expenses.service'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  display: boolean = false
  fruitsArray: string[] = []
  data = []

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
      enabled: true,
      keys: ["amount"]
    },
    sort: true,
    delete: true,
    edit: true
  }


  editFlag: boolean = false

  form = this.fb.group({
    id: [{ value: "", disabled: true }],
    name: [{ value: "", disabled: false }, Validators.required],
    amount: [{ value: null, disabled: false }, Validators.required],
    fruits: this.fb.array([])
  })

  constructor(private fb: FormBuilder, private expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.getAllExpenses()
  }

  get fruits() {
    return this.form.get("fruits") as FormArray
  }

  addExpense() {
    console.log(this.form.getRawValue())
    this.expensesService.addExpense(this.form.getRawValue()).subscribe((res) => {
      console.log(res)
      this.form.reset()
      this.showToastMessage(res.message, "success")
      this.getAllExpenses()
    })
  }

  edit() {
    console.log(this.form.getRawValue())

    this.expensesService.editExpenses(this.form.getRawValue()).subscribe((res) => {
      this.showToastMessage(res.message, "success")
      this.getAllExpenses()
      this.editFlag = false
      this.form.reset()
    })
  }

  cancelEdit() {
    this.editFlag = false
    this.form.reset()
  }
  getAllExpenses() {
    this.expensesService.getAllExpenses().subscribe((res) => {
      this.data = res.message

      this.fruitsArray = Object.keys(this.data[0])

    })
  }



  openModal(data) {
    this.modal.open = true
    this.modal.message = `are you sure you want to delete ${data.name}`
    this.modal.data = data.id
  }

  delete(data) {


    this.modal.open = false
    this.expensesService.deleteExpense(data).subscribe((res) => {
      this.showToastMessage(res.message, "success")
      this.getAllExpenses()

    })
  }

  showToastMessage(message, severity) {

    this.toast = JSON.parse(JSON.stringify({
      message: message,
      severity: severity,
      active: true
    }))

  }

  populateFields(data) {
    this.editFlag = true
    this.form.patchValue(data)
  }


  test(){
    console.log(this.form.getRawValue())
  }

    preventEventPropagation(event){
    event.stopPropagation()
    if(!event.target.classList.contains("checkbox-dropdown")){
      this.display=false
    }
  }

}

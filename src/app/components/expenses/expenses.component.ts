import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';

import { ExpensesService } from '../../services/expenses.service'
import {LoginService} from '../../services/login.service'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  display: boolean = false
  localArray: string[] = ["test 1","test 2","test 3","test 4"]
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

  constructor(private fb: FormBuilder, private expensesService: ExpensesService,private loginService:LoginService) { }


  ngOnInit(): void {
    // this.loginService.checkSessionStorage()
    this.getAllExpenses()

  }

  get fruits() {
    return this.form.get("fruits") as FormArray
  }

  addExpense() {
    console.log("adding expense",this.form.getRawValue())
    this.expensesService.addExpense(this.form.getRawValue()).subscribe((res) => {

      // this.form.reset()
      this.resetForm()
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
      // this.form.reset()
      this.resetForm()

    })
  }

  cancelEdit() {
    this.editFlag = false
    // this.form.reset()
    this.resetForm()
  }
  getAllExpenses() {
    this.expensesService.getAllExpenses().subscribe((res) => {
      this.data = res.message
      console.log("get all expenses",this.data)


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


  // set attributes for toast message
  showToastMessage(message, severity) {

    // to detect changes use stringify
    this.toast = JSON.parse(JSON.stringify({
      message: message,
      severity: severity,
      active: true
    }))

  }

  populateFields(data) {

    this.form.patchValue(data)
    data.fruits.forEach((fruit)=>{
      this.fruits.push(this.fb.control(fruit))
    })
  }

  test() {
    console.log(this.form.getRawValue())
  }

  resetForm(){
    this.form.reset()
    this.fruits.clear()
  }


  // enable edit flag to display update and cancel buttons
  enableEdit(data){
    this.editFlag = true

    // call populate fields to populate form data and push values to fruits array
    this.populateFields(data)
  }
}

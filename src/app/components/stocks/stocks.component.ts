import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../services/stocks.service'
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import {LoginService} from '../../services/login.service'
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {


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

  selectedData = null
  calculatedStats = []

  stats = {
    percentage: null,
    totalSellAmount: null,
    difference: null
  }
  titles: string[] = []


  // features for tab
  additionalFeatures = {
    grandTotal: {
      enabled: true,
      keys: ["buy amount", "quantity", "price"]
    },
    sort: true,
    delete: true,
    edit:false
  }

  calculatedStatsFeatures = {
    grandTotal: {
      enabled: false,
      keys: ["buy amount", "quantity", "price"]
    },
    sort: false,
    delete: false,
    edit:false
  }

  data = []

  form = this.fb.group({
    name: [{ value: "", disabled: false }, Validators.required],
    price: [{ value: null, disabled: false }, [Validators.required, Validators.min(0)]],
    buyAmount: [{ value: null, disabled: false }, [Validators.min(1), Validators.required]],
    quantity: [{ value: null, disabled: false }],
  })

  sellForm = this.fb.group({
    currentAmount: [{ value: null, disabled: false }, Validators.required]
  })

  constructor(private stockService: StocksService, private fb: FormBuilder,private loginService:LoginService) { }



  ngOnInit(): void {
    this.loginService.checkSessionStorage()
    this.getAllStocks()

  }

  get name(): string | any {
    return this.form.get("name")
  }

  get price(): number | any {
    return this.form.get("price")
  }

  get quantity(): number | any {
    return this.form.get("quantity")
  }

  get buyAmount(): number | any {
    return this.form.get("buyAmount")
  }

  get currentAmount(): number | any {
    return this.sellForm.get("currentAmount")
  }


  addStock() {

    // if(this.price.value==0){
    //   this.quantity.setValue(0)
    // }
    this.name.setValue(this.name.value.toUpperCase())

    this.quantity.setValue((this.buyAmount.value / this.price.value).toFixed(2))

    this.stockService.addStock(this.form.getRawValue()).subscribe((res) => {

      this.showToastMessage(res.message, "success")
      this.form.reset()
      this.getAllStocks()

      console.log(res)
    })
  }

  getAllStocks() {
    this.stockService.getAllStocks().subscribe((res) => {
      this.data = res.message

      // this.titles = Object.keys(this.data[0])

      // this.data=this.data.map((data) => {
      //   return ({...data,edit:"edit"})

      // })

      this.selectedData = this.data[0];
    })
  }

  getStats(data) {
    if (this.calculatedStats.length != 0) {
      this.calculatedStats.pop()
    }
    this.showToastMessage(`${data.name} selected for calculation`, "success")
    this.selectedData = data
    console.log(this.selectedData)
    this.sellForm.reset()

  }


  calculate() {
    this.stats.percentage = (((this.currentAmount.value - this.selectedData.price) / this.selectedData.price) * 100).toFixed(2)
    this.stats.totalSellAmount = (this.selectedData.quantity * this.currentAmount.value).toFixed(2)
    this.stats.difference = this.stats.totalSellAmount - this.selectedData.buyAmount
    console.log(this.stats.difference)
    console.log(this.stats.totalSellAmount)

    this.calculatedStats.push({ ...this.selectedData, ...this.stats })



  }

  getTitles(data) {

    return Object.keys(data)
  }

  openModal(data) {

    this.modal.open = true
    this.modal.message = "Are you sure you want to delete"
    this.modal.data = data.id
  }

  showToastMessage(message, severity) {

    this.toast = JSON.parse(JSON.stringify({
      message: message,
      severity: severity,
      active: true
    }))

  }


  delete(data) {
    console.log(data)
    this.modal.open = false;
    this.stockService.deleteStock(data).subscribe((res)=>{
      this.showToastMessage(res.message,"success")
      this.getAllStocks()
    })

  }


}

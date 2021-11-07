import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../services/stocks.service'
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stats = null;


  additionalFeatures={ 
    grandTotal:{
      enabled:true,
      keys:["buy amount","quantity","price"]
    },
    sort:true
  }

  data = []
  message: string = ""
  form = this.fb.group({
    name: [{ value: "", disabled: false }, Validators.required],
    price: [{ value: null, disabled: false }, [Validators.required, Validators.min(0)]],
    quantity: [{ value: null, disabled: false }, [Validators.min(1), Validators.required]],
    buyAmount: [{ value: null, disabled: false }],
  })

  constructor(private stockService: StocksService, private fb: FormBuilder) { }



  ngOnInit(): void {
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



  addStock() {

    // if(this.price.value==0){
    //   this.quantity.setValue(0)
    // }
    this.name.setValue(this.name.value.toUpperCase())
    this.buyAmount.setValue(this.price.value * this.quantity.value)

    this.stockService.addStock(this.form.getRawValue()).subscribe((res) => {

      this.form.reset()
      this.getAllStocks()
      console.log(res)
    })
  }

  getAllStocks() {
    this.stockService.getAllStocks().subscribe((res) => {
      this.data = res.message
    })
  }

  getStats(data) {
    console.log(data)
    this.stats = data
  }



}

import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data
  @Input() additionalFeatures
  @Output() selectedData=new EventEmitter()

  grandTotal={}
  titles:string[]=[]
  sortFlag=false
  constructor() { }

  ngOnInit(): void {
    this.generateTitles()

  }


  generateTitles(){
    this.titles = Object.keys(this.data[0])
    if(this.additionalFeatures.grandTotal.enabled){
      this.additionalFeatures.grandTotal.keys.forEach((key)=>{
        this.grandTotal[key] = this.data.map((data) => data[key]).reduce((a, b) => a + b)
      })
      
    }

    console.log(this.additionalFeatures.grandTotal.enabled)
  }



  sort(title){

    console.log(this.data)
    this.sortFlag=!this.sortFlag
    this.data=this.data.sort((a,b)=>{
      if(this.sortFlag){
        if(a[title]>b[title]){
          return -1
        }
        else{
          return 1
        }
      }
      else{
        if(b[title]>a[title]){
          return -1
        }
        else{
          return 1
        }
      }

    })

  }
  getStats(data){
    this.selectedData.emit(data)
  }

}

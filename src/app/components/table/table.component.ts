import { Component, Input, OnInit, Output,EventEmitter,SimpleChanges, OnChanges  } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
  @Input() data
  @Input() additionalFeatures
  @Output() selectedData=new EventEmitter()
  @Output() deleteData=new EventEmitter()
  @Output() editData=new EventEmitter()

  grandTotal={}
  titles:string[]=[]
  sortFlag:boolean=false
  rotate:boolean=false
  clickedIndex=null
  clickCount:number|null=null
  faTrash = faTrash;
  faEdit=faEdit
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateTitles()

  }


  generateTitles(){
    this.titles = Object.keys(this.data[0])

    if(this.additionalFeatures.grandTotal.enabled){
      this.additionalFeatures.grandTotal.keys.forEach((key)=>{

        this.grandTotal[key] = this.data.map((data) => data[key]).reduce((a, b) => a + b)
      })
      
    }
  }

  sort(title,index){

    this.rotate=!this.rotate
    this.clickedIndex=index
    setTimeout(()=>{
      this.clickedIndex=null
    },300)


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

  delete(data){
      this.deleteData.emit(data)
  }


  edit(data){
    this.editData.emit(data)
  }
}

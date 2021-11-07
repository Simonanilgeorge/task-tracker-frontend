import { Component, Input, OnInit,Output,EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnChanges  {
@Input() toast
@Output() test=new EventEmitter()
@Input() message;
@Input() severity;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {

    setTimeout(()=>{
      this.test.emit(false)
    },1500)

  }


}

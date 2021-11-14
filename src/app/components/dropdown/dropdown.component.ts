import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() array
  @Input() localArray
  @Input() display
  @Output() displayChange=new EventEmitter()


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // dropdown checkbox
  test(fruit, event) {

    event.stopPropagation()

    if (this.array.getRawValue().includes(fruit)) {
      this.array.removeAt(this.array.getRawValue().findIndex((f) => f == fruit))
    }
    else {
      this.array.push(this.fb.control(fruit))
    }
  }

  checkAll(event) {

    event.stopPropagation()
    this.array.clear()
    if (event.target.checked) {
      this.localArray.forEach((fruit) => {
        this.array.push(this.fb.control(fruit))
      })
    }
  }

  displayDropDown(event) {

    event.stopPropagation()
    this.display = !this.display
    this.displayChange.emit(this.display)

  }

}

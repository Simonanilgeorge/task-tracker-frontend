import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() fruits
  @Input() fruitsArray
  @Input() display
  @Output() displayChange=new EventEmitter()


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // dropdown checkbox
  test(fruit, event) {

    event.stopPropagation()

    if (this.fruits.getRawValue().includes(fruit)) {
      this.fruits.removeAt(this.fruits.getRawValue().findIndex((f) => f == fruit))
    }
    else {
      this.fruits.push(this.fb.control(fruit))
    }
  }

  checkAll(event) {

    event.stopPropagation()
    this.fruits.clear()
    if (event.target.checked) {
      this.fruitsArray.forEach((fruit) => {
        this.fruits.push(this.fb.control(fruit))
      })
    }
  }

  displayDropDown(event) {

    event.stopPropagation()
    this.display = !this.display
    this.displayChange.emit(this.display)

  }

}

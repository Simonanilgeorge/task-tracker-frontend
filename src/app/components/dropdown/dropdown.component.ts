import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() fruits
  @Input() fruitsArray
  @Input() preventEventPropagation = (event) => {
    event.stopPropagation()
    if (!event.target.classList.contains("checkbox-dropdown")) {
      console.log("clicked outside")
      this.display = false
    }
  };

  display: boolean = false
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
    console.log(this.fruits.getRawValue())
  }

  displayDropDown(event) {
    this.display = !this.display
    console.log(this.display)
  }



  // preventEventPropagation(event){
  //   event.stopPropagation()
  //   if(!event.target.classList.contains("checkbox-dropdown")){
  //     console.log("clicked outside")
  //     this.display=false
  //   }
  // }

}

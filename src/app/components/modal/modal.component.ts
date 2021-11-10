import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modal
  @Output() modalClick = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }


  closeModal() {
    this.modal.open = false
  }
}

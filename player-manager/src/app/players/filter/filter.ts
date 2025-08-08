import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter {
  @Input() label = '';
  @Input() options: string[] = [];
  @Output() changed = new EventEmitter<string|undefined>();
  value ='';
}

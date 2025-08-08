import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Player } from '../player.model';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './player-form.html'
})
export class PlayerForm implements OnInit {
  @Input() model!: Player;
  @Output() saved = new EventEmitter<Player>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: [this.model?.firstname || '', Validators.required],
      lastname: [this.model?.lastname || '', Validators.required],
      teamid: [this.model?.teamid || '', Validators.required],
      position: [this.model?.position || '', Validators.required],
      age: [this.model?.age || '', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.saved.emit(this.form.value);
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../player.model';

@Component({
  selector: 'app-player-list',
  imports: [],
  templateUrl: './player-list.html',
  styleUrl: './player-list.css'
})
export class PlayerList {
  @Input() players: Player[] = [];
  @Output() edit = new EventEmitter<Player>();
  @Output() remove = new EventEmitter<number>();

  onEdit(p: Player)   { this.edit.emit(p); }
  onDelete(id: number){ this.remove.emit(id); }
}

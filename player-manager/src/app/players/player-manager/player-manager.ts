import { Component, signal, computed } from '@angular/core';
import { Player } from '../player.model'
import { PlayerService } from '../player';
import { Filter } from '../filter/filter';
import { PlayerList } from '../player-list/player-list';
import { FormsModule } from '@angular/forms';
import { PlayerForm } from '../player-form/player-form';

@Component({
  selector: 'app-player-manager',
  imports: [Filter, PlayerList, FormsModule, PlayerForm],
  templateUrl: './player-manager.html',
  styleUrl: './player-manager.css'
})
export class PlayerManager {
  players = signal<Player[] | null>(null);
  editModel: Player | null = null;
  error = signal<string | null>(null);

  teamFilter = signal<string | undefined>(undefined);
  posFilter = signal<string | undefined>(undefined);

  constructor(private api: PlayerService) {
    this.loadPlayers();
  }

  loadPlayers() {
    this.api.list().subscribe((players: Player[]) => {
      this.players.set(players);
    });
  }

  startEdit(p: Player) {
    this.editModel = { ...p };
  }

  cancelEdit() {
    this.editModel = null;
  }

  startCreate() {
  this.editModel = {
    firstname: '',
    lastname: '',
    teamid: 0,
    position: '',
    age: 18
  };
}

saveEdit() {
  if (!this.editModel) return;

  const model = this.editModel;
  const req = model.id
    ? this.api.update(model.id, model)
    : this.api.create(model);

  req.subscribe(() => {
    this.editModel = null;
    this.loadPlayers();
  });
}
  
  ngOnInit(): void {
    this.api.list().subscribe({
      next: (data) => {
        console.log('Players from API:', data);
        this.players.set(data);
      },
      error: (err) => {
        console.log(err);
        this.error.set('Failed to load players');
      }
    });
  }

  teams = computed(() =>
    Array.from(new Set((this.players() ?? []).map(p => String(p.teamid))))
  );

  positions = computed(() =>
    Array.from(new Set((this.players() ?? []).map(p => p.position)))
  );

  filteredPlayers = computed(() =>
    (this.players() ?? []).filter(p =>
      (!this.teamFilter() || String(p.teamid) === this.teamFilter()) &&
      (!this.posFilter()  || p.position === this.posFilter())
    )
  );

  onTeamChange(v: string|undefined) { this.teamFilter.set(v); }
  onPosChange(v: string|undefined)  { this.posFilter.set(v); }
  
  editing = signal<Player | null>(null);

  delete(id: number) {
    if (!confirm('Delete this player?')) return;
   this.api.delete(id).subscribe(() => this.loadPlayers());
  }
  saveFromForm(player: Player) {
  if (this.editModel?.id) {
    this.api.update(this.editModel.id, player).subscribe(() => {
      this.loadPlayers(); // refresh list after update
      this.cancelEdit();  // close the form
    });
  } else {
    this.api.create(player).subscribe(() => {
      this.loadPlayers(); // refresh list after create
      this.cancelEdit();  // close the form
    });
  }
}
}

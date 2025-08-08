import { Routes } from '@angular/router';
import { PlayerManager } from './players/player-manager/player-manager';

export const routes: Routes = [
    { path: 'players', component: PlayerManager},
    { path: '', redirectTo: 'player', pathMatch: 'full'},
];

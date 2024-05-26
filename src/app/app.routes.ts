import { Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { DefaultComponent } from './default/default.component';
import { FreeagentComponent } from './freeagent/freeagent.component';
import { ScheduleComponent } from './schedule/schedule.component';

export const routes: Routes = [
    {path: '', component: DefaultComponent},
    {path: 'players', component: PlayerComponent},
    {path: 'freeagent', component: FreeagentComponent},
    {path: 'schedule', component: ScheduleComponent}
];

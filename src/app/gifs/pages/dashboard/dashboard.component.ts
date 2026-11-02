import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard.component',
  templateUrl: './dashboard.component.html',
  imports: [RouterOutlet], //importamos para las rutas hijas de dasboard
})
export default class DashboardComponent {}

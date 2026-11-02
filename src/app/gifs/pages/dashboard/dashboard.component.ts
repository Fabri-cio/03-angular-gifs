import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu.component/side-menu.component';

@Component({
  selector: 'app-dashboard.component',
  templateUrl: './dashboard.component.html',
  imports: [RouterOutlet, SideMenuComponent], //importamos para las rutas hijas de dasboard
})
export default class DashboardComponent {}

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOptions {
  icon: string;
  label: string;
  route: string;
  sublabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  //array de menuOptions de tipo MenuOptions
  menuOptions: MenuOptions[] = [
    {
      icon: 'fa-solid fa-arrow-trend-up',
      label: 'Trending',
      sublabel: 'Gifs',
      route: 'trending', //esta ruta es dashboard/trending
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      sublabel: 'Buscar Gifs',
      route: 'search', //esta ruta es dashboard/search
    },
  ];
}

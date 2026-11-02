import { Component } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-trending',
  imports: [GifListComponent],
  templateUrl: './trending.component.html',
})
export default class Trending {}

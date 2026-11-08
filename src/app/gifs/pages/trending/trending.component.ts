import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending',
  imports: [GifListComponent],
  templateUrl: './trending.component.html',
})
export default class Trending {
  // tambien solo puede ser un array de strings
  // gifs = imageUrls;

  //aqui es una señal
  // gifs = signal(imageUrls);

  //servicio de gifs inyeccion
  // ahora solo nos sirve la inyeccin de servicio
  gifService = inject(GifService);
}

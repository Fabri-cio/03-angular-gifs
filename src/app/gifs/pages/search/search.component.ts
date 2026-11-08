import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search',
  imports: [GifListComponent], // importamos el gif-list-component
  templateUrl: './search.component.html',
})
export default class Search {
  //inyectamos el servicio o instanciamos (GifSerice class)
  gifService = inject(GifService);

  gifs = signal<Gif[]>([]);

  //creamos un metodo onSearch para mandar la consulta de tipo string al metodo del servicio
  onSearch(query: string) {
    // se traslada el subscribe del servicio aqui por el return del servicio
    this.gifService.searchGifs(query).subscribe((resp) => {
      // aqui el componente deside si quiere suscribirse
      this.gifs.set(resp); // se establece los gifs con el valor de resp
    });
  }
}

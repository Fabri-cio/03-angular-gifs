import { Component, inject } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-search',
  imports: [GifListComponent], // importamos el gif-list-component
  templateUrl: './search.component.html',
})
export default class Search {
  //inyectamos el servicio o instanciamos (GifSerice class)
  gifService = inject(GifService);

  //creamos un metodo onSearch para mandar la consulta de tipo string al metodo del servicio
  onSearch(query: string) {
    this.gifService.searchGifs(query);
  }
}

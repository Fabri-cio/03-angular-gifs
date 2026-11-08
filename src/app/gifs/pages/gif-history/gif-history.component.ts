import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {

  // inyectamos el servicio
  gifService = inject(GifService) 

  // contiene el valor de la query pasado por argumento al url
  query = toSignal( // toSignal convierte un Observable de RxJS en un signal de Angular
    inject(ActivatedRoute).params.pipe(map((params) => params['query'])), // inject(ActivatedRoute) es un servicio de angular que permite acceder a la imformacion actual 
  );

  //
  gifsBykey = computed(() => {
    return this.gifService.getHistoryGifs(this.query())
  })
}

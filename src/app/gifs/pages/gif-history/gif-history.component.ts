import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {
  query = toSignal( // toSignal convierte un Observable de RxJS en un signal de Angular
    inject(ActivatedRoute).params.pipe(map((params) => params['query'])), // inject(ActivatedRoute) es un servicio de angular que permite acceder a la imformacion actual 
  );
}

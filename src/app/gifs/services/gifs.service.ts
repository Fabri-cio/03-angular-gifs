import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({ providedIn: 'root' }) // crea una instancia unica (singleton) en memoria global
export class GifService {
  private http = inject(HttpClient); // inyecta el cliente conectado al fetch

  // propiedade que le da el espacio para almacenar es estado de nuestros trendingGifs
  trendingGifs = signal<Gif[]>([]);

  // señal que nos dice si los gifs estan cargando
  trendingsGifsloading = signal(true);

  constructor() {
    // dispara el metodo en el hilo principal al inicializar
    this.cargarTrendingGifs();
  }

  cargarTrendingGifs() {
    // instancia un observable
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApikey,
          limit: 20,
        },
      })
      // subscribe disparador y receptor muy importante
      .subscribe((response) => {
        const gifs = GifMapper.mapearGiphyItemToGifArray(response.data);
        this.trendingGifs.set(gifs); // establecer en los gifs el array de gifs
        this.trendingsGifsloading.set(false); // establecemos en false la señal cuando los trendings se hallan cargado
        console.log(gifs);
      });
  }
}

// el atajo a-service para generar este codigo sale gracias
// a la extencion de angular snippets 22 de john Papa

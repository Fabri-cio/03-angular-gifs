import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' }) // crea una instancia unica (singleton) en memoria global
export class GifService {
  private http = inject(HttpClient); // inyecta el cliente conectado al fetch

  // propiedade que le da el espacio para almacenar es estado de nuestros trendingGifs
  trendingGifs = signal<Gif[]>([]);

  // señal que nos dice si los gifs estan cargando
  trendingsGifsloading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>({}); // el historial de lo que buscamos
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory())); // obtiene en una señal conputada las keys del historial anterior

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

  // metodo que recibe un parametro query de tipo string para retornar un array con las coincidencias del query
  searchGifs(query: string) {
    // instancia un observable
    return (
      this.http
        .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
          params: {
            api_key: environment.giphyApikey,
            q: query,
            limit: 20,
          },
        })
        // pipe permite aplicar operaciones a este operador como los dos maps
        .pipe(
          map(({ data }) => data), // extrae data
          map((items) => GifMapper.mapearGiphyItemToGifArray(items)), // transforma los gifs a un array

          //historial
          // tap permite ejecutar una accion adicional (efecto secundario)
          // sin modificar los datos que siguen circulando por el Observable
          tap((items) => {
            this.searchHistory.update((history) => ({ // se actualiza la señal conputada
              ...history,
              [query.toLocaleLowerCase()]: items, // { goku: [gifs de goku]}
            }));
          }),
        )
    );
  }

  //obtiene el historial de gifs deacuerdo a la query 
  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}

// el atajo a-service para generar este codigo sale gracias
// a la extencion de angular snippets 22 de john Papa

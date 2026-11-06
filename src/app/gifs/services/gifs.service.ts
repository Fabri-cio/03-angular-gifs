import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';

@Injectable({ providedIn: 'root' }) // crea una instancia unica (singleton) en memoria global
export class GifService {
  private http = inject(HttpClient); // inyecta el cliente conectado al fetch

  constructor() {
    // dispara el metodo en el hilo principal al inicializar
    this.cargarTrendingGifs();
  }

  cargarTrendingGifs() {
    // instancia un observable
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApikey,
        limit: 20,
      },
    });
  }
}

// el atajo a-service para generar este codigo sale gracias
// a la extencion de angular snippets 22 de john Papa

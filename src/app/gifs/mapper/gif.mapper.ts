import type { Gif } from '../interfaces/gif.interface';
import type { GiphyItem } from '../interfaces/giphy.interfaces';

// clase para crear dos metodos para mapear los gifs
export class GifMapper {
  // metodo estatico que mapea de Giphyitem a Gif con tres propiedades
  static mapearGiphyItemToGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    };
  }

  // metodo estatico que mapea el metodo anterior a array de Gifs
  static mapearGiphyItemToGifArray(items: GiphyItem[]): Gif[] {
    return items.map(this.mapearGiphyItemToGif);
  }
}

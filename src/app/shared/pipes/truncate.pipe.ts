import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 20, completeWords: boolean = false, ellipsis: string = '...'): string {
    // Si el valor es nulo o indefinido, retorna una cadena vacía
    if (!value) return ''; 
    
    if (completeWords) {
      // Trunca el texto al límite especificado
      let truncatedValue = value.substr(0, limit);
      // Encuentra el índice del último espacio en el texto truncado
      const lastSpaceIndex = truncatedValue.lastIndexOf(' ');

      // Si el índice del último espacio es mayor a 0, es decir, es válido
      if (lastSpaceIndex > 0) {
        truncatedValue = truncatedValue.substr(0, lastSpaceIndex);
      }

      // Si el texto original es más largo que el límite, añade puntos suspensivos
      return value.length > limit ? truncatedValue + ellipsis : value;
    }

    // Trunca el texto directamente si no se completan palabras y añade puntos suspensivos si es necesario
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}

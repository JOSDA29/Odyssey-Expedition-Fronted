import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 20, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return ''; // Si el valor es nulo o indefinido, retorna una cadena vacía
    
    if (completeWords) {
      let truncatedValue = value.substr(0, limit);
      const lastSpaceIndex = truncatedValue.lastIndexOf(' ');

      // Si el último espacio está en una posición válida (es decir, no es el primer carácter)
      if (lastSpaceIndex > 0) {
        truncatedValue = truncatedValue.substr(0, lastSpaceIndex);
      }

      // Retorna el texto truncado seguido de puntos suspensivos si la palabra completa excede el límite
      return value.length > limit ? truncatedValue + ellipsis : value;
    }

    // Retorna el texto truncado si excede el límite de caracteres
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}

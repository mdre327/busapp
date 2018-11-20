import {MatPaginatorIntl} from '@angular/material';
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'Elementi per pagina';
  nextPageLabel     = 'Successivo';
  previousPageLabel = 'Precedente';

  getRangeLabel = function (page: any, pageSize: any, length: any) {
    if (length === 0 || pageSize === 0) {
      return '0 di ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' di ' + length;
  };

}
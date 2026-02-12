
//este archivo define la estructura de un objeto de paginacion que se envia o recibe el back

import { SortPage } from './SortPage';

export class Pageable {
    pageNumber: number = 0; //numero de pagina que se solicita
    pageSize: number = 0; //cantidad de elementos por pagina
    sort: SortPage[] = []; //criterios de ordenacion clase SORT
}

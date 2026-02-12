
//Este archivo representa una pagina de autor devuelta por el back

import { Pageable } from "src/app/core/model/page/Pageable";
import { Author } from "./Author";

export class AuthorPage {
    content: Author[] = []; //lista de autores que devuelve la pagina actual
    pageable: Pageable = new Pageable; //paginacion con valores poor defecto
    totalElements: number = 0; //total de autores existentes
}

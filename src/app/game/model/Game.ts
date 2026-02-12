import { Category } from "src/app/category/model/Category";
import { Author } from "src/app/author/model/Author";


export class Game {
    id?: number;
    title: string = '';
    age: number = 0;
    category?: Category;
    author?: Author;
}

import { Brand } from '../brand-component/brand';
import { Category } from '../category-component/category';
import { Supplier } from '../supplier-component/supplier';

export class Product {

    productId: number;
    code: number = 0;
    state: boolean = true;
    name: string;
    imagePath: string;
    stock: number;
    description: string;
    price: number;
    category: Category;
    brand: Brand;
    supplier: Supplier;

}

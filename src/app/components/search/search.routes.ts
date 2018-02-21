import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';


// import { BUSQUEDA_ROUTES } from './components/busqueda/busqueda.routes';


export const SEARCH_ROUTES: Routes = [
    { path: 'productos', component: ProductsComponent },
    { path: 'usuarios', component: UsersComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'productos'},
];


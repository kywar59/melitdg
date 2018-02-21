import { Routes } from '@angular/router';
import { PublicadasComponent } from './publicadas/publicadas.component';
import { PublicarComponent } from './publicar/publicar.component';
import { PublicarloteComponent } from './publicarlote/publicarlote.component';


// import { BUSQUEDA_ROUTES } from './components/busqueda/busqueda.routes';


export const LIST_ROUTES: Routes = [
    { path: 'publicadas', component: PublicadasComponent },
    { path: 'publicar-item', component: PublicarComponent },
    { path: 'publicar-lote', component: PublicarloteComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'publicadas'},
];

import { Routes } from '@angular/router';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { RespuestasComponent } from './respuestas/respuestas.component';


// import { BUSQUEDA_ROUTES } from './components/busqueda/busqueda.routes';


export const QUEST_ROUTES: Routes = [
    { path: 'preguntas', component: PreguntasComponent },
    { path: 'respuestas', component: RespuestasComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'preguntas'},
];

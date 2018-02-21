import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { ViewproductComponent } from './components/search/viewproduct/viewproduct.component';
import { CallbackComponent } from './components/callback/callback.component';
import { CbimgComponent } from './components/cbimg/cbimg.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LoginComponent } from './components/login/login.component';
import { LoginmlComponent } from './components/loginml/loginml.component';
import { AccessComponent } from './components/access/access.component';

import { AuthGuardMlService } from './services/auth-guard-ml/auth-guard-ml.service';

import { SEARCH_ROUTES } from './components/search/search.routes';
import { LIST_ROUTES } from './components/publicaciones/publicaciones.routes';
import { QUEST_ROUTES } from './components/feedback/feedback.routes';

const ROUTES: Routes = [
    { path: 'loginml', component: LoginmlComponent },
    { path: 'access', component: AccessComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardMlService] },
    { path: 'buscar', component: SearchComponent, children: SEARCH_ROUTES,
      canActivate: [AuthGuardMlService],
      canActivateChild: [AuthGuardMlService] },
    { path: 'producto/:id', component: ViewproductComponent },
    { path: 'publicaciones', component: PublicacionesComponent, children: LIST_ROUTES,
      canActivate: [AuthGuardMlService],
      canActivateChild: [AuthGuardMlService] },
    { path: 'feedback', component: FeedbackComponent, children: QUEST_ROUTES,
      canActivate: [AuthGuardMlService],
      canActivateChild: [AuthGuardMlService] },
    { path: 'callmeliapp', component: CallbackComponent },
    { path: 'cbimg', component: CbimgComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/'},
];

// tslint:disable-next-line:eofline
export const APP_ROUTING = RouterModule.forRoot(ROUTES);

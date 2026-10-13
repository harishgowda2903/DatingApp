import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MembersList } from '../features/members/members-list/members-list';
import { MembersDetailed } from '../features/members/members-detailed/members-detailed';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { authGuard } from '../core/guards/auth-guard';
import { TestError } from '../features/test-error/test-error';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MembersList, canActivate: [authGuard] },
            { path: 'members/:id', component: MembersDetailed },
            { path: 'lists', component: Lists },
            { path: 'messages', component: Messages },
        ]
    },
    {path: 'errors', component: TestError},
    {path:'server-error', component: ServerError},
    { path: '**', component: NotFound },

];

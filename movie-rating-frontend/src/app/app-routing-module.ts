import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { ListMovie } from './movies/list-movie/list-movie';
import { AddMovie } from './movies/add-movie/add-movie';
import { UpdateMovie } from './movies/update-movie/update-movie';
import { MovieDetails } from './movies/movie-details/movie-details';
import { MyRatings } from './ratings/my-ratings/my-ratings';

import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

  { path: 'movies', component: ListMovie, canActivate: [authGuard] },
  { path: 'movies/add', component: AddMovie, canActivate: [authGuard, adminGuard] },
  { path: 'movies/update/:id', component: UpdateMovie, canActivate: [authGuard, adminGuard] },
  { path: 'movies/:id', component: MovieDetails, canActivate: [authGuard] },

  { path: 'my-ratings', component: MyRatings, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

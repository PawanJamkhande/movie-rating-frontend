import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { MaterialModule } from './shared/material/material-module';

import { App } from './app';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Navbar } from './components/navbar/navbar';
import { Sidenav } from './components/sidenav/sidenav';
import { Dashboard } from './components/dashboard/dashboard';

import { ListMovie } from './movies/list-movie/list-movie';
import { AddMovie } from './movies/add-movie/add-movie';
import { UpdateMovie } from './movies/update-movie/update-movie';
import { MovieDetails } from './movies/movie-details/movie-details';
import { TrailerDialog } from './movies/movie-details/trailer-dialog/trailer-dialog';

import { MyRatings } from './ratings/my-ratings/my-ratings';

import { StarRatingComponent } from './shared/star-rating/star-rating';

@NgModule({
  declarations: [
    App,
    Login,
    Register,
    Navbar,
    Sidenav,
    Dashboard,
    ListMovie,
    AddMovie,
    UpdateMovie,
    MovieDetails,
    TrailerDialog,
    MyRatings,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }

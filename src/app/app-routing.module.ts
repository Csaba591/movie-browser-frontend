import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorPageComponent } from './components/actor-page/actor-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MoviePageComponent } from './components/movie-page/movie-page.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'movies/:id', component: MoviePageComponent },
    { path: 'search', component: HomePageComponent },
    { path: 'actor/:id', component: ActorPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

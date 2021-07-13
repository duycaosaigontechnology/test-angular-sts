import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';

const routes: Routes = [
  {path: 'landing-page', component: LandingPageComponent},
  {path: 'second-page', component: SecondPageComponent},
  {path: 'third-page', component: ThirdPageComponent},
  {path: '', redirectTo: '/landing-page', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

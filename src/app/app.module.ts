import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import {AppSettingsService} from './app.services';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ReplaceTextDirective } from './replace-text.directive';
import { AppReplaceComponent } from './app-replace/app-replace.component';

@NgModule({
  declarations: [
    AppComponent,
    SecondPageComponent,
    LandingPageComponent,
    HeaderComponent,
    ThirdPageComponent,
    AppMenuComponent,
    AppLayoutComponent,
    ReplaceTextDirective,
    AppReplaceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [AppSettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

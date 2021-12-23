import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchformComponent } from './searchform/searchform.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ResultsComponent } from './results/results.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighchartsChartModule} from 'highcharts-angular';
import { TempChartComponent } from './temp-chart/temp-chart.component';
import { MapDetailsComponent } from './map-details/map-details.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { MeteogramChartComponent } from './meteogram-chart/meteogram-chart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoritesComponent } from './favorites/favorites.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DailyViewDataComponent } from './daily-view-data/daily-view-data.component';
//import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    SearchformComponent,
    ResultsComponent,
    TempChartComponent,
    MapDetailsComponent,
    DetailsPageComponent,
    MeteogramChartComponent,
    FavoritesComponent,
    DailyViewDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent} from './results/results.component'
import { DetailsPageComponent} from './details-page/details-page.component'
import { FavoritesComponent } from './favorites/favorites.component'
import { TempChartComponent} from './temp-chart/temp-chart.component'
import { DailyViewDataComponent} from'./daily-view-data/daily-view-data.component';
import { AppComponent } from './app.component'
//List of Routes to Navigate in the App
const routes: Routes = [
  {
    path: 'details',
    component: DetailsPageComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: 'tempchart',
    component: TempChartComponent
  },
  {
    path: 'dailyview',
    component: DailyViewDataComponent
  },
  {
    path: '**', 
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

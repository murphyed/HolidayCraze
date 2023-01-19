import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./home/dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { MemoriesComponent } from "./home/memories/memories.component";
import { SearchComponent } from "./home/search/search.component";
import { LoginComponent } from "./shared/login/login.component";
import { SharedGuard } from "./shared.guard";

//  canActivate: [SharedGuard],

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "search", component: SearchComponent },
      { path: "memories", component: MemoriesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

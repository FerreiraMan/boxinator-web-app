import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login-page/login-page.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { ProfileCompletionGuard } from "./utils/profile-completion.guard";


const routes: Routes = [
    { 
        path: "home", 
        component: HomeComponent, 
        canActivate: [AuthGuard , ProfileCompletionGuard]
    },
    { 
        path: "login", 
        component: LoginComponent 
    },
    { 
        path: "profile", 
        component: ProfilePageComponent, 
        canActivate: [AuthGuard]
    },
    { 
        path: "", 
        redirectTo: "login", 
        pathMatch: "full"
    },
    { 
        path: "**", 
        redirectTo: "login", 
        pathMatch: "full"
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [AuthGuard],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  
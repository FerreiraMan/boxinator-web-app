import { Component } from '@angular/core';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'boxinatorApp';

  canAppear () {
    return keycloak.authenticated;
  }

}

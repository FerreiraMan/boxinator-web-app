import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import keycloak, { initialize } from './keycloak';

initialize()
.then(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
})


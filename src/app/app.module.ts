import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeApiService } from './fake-api.service';

// See: https://github.com/MurhafSousli/ngx-gallery/wiki
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { reducers, metaReducers } from './reducers';
import { DocumentEffects } from './store/effects';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { DetailsComponent } from './details/details.component';
import { EditorDirective } from './editor.directive';
import { ControlErrorsDirective } from './control-errors.directive';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    DetailsComponent,
    EditorDirective,
    ControlErrorsDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgProgressModule,
    NgProgressHttpModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([DocumentEffects]),
    StoreDevtoolsModule.instrument({
      name: 'dynamic-buttons-lab',
      logOnly: environment.production
    }),
    InMemoryWebApiModule.forRoot(FakeApiService, { delay: 500 })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Toolbar } from './commom/components/toolbar/toolbar';
import { Formulario } from './features/formulario/components/formulario/formulario';
import { Footer } from './commom/components/footer/footer';
import { MaterialModule } from './shared/material/material.module';
import { ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    Toolbar,
    Formulario,
    Footer
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule 
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }

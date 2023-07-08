import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { environment } from "src/environments/environment";
import { ROUTES } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            // Firebase
            provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())),
        provideAnimations(),
        provideRouter(ROUTES, withComponentInputBinding()),
    ]
}
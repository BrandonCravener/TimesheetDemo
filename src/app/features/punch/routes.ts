import { Routes } from "@angular/router";
import { AddPunchComponent } from "./pages/add-punch/add-punch.component";
import { ViewerComponent } from "./pages/viewer/viewer.component";

export default [
    {
        path: 'add',
        component: AddPunchComponent,
        data: {
            edit: false
        }
    },
    {
        path: 'edit/:punchId',
        component: AddPunchComponent,
        data: {
            edit: true
        }
    },
    {
        path: 'viewer',
        component: ViewerComponent
    }
] as Routes;
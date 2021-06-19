import { Routes, Route } from '@angular/router';
import {
  AuthenticationGuard,
  AuthenticationRoleCheckGuard,
} from '../auth/authentication.guard';
import { EmployeeShellComponent } from '../employeeShell/employeeShell.component';
import { ShellComponent } from './shell.component';

/**
 * Provides helper methods to create routes.
 */
export class Shell {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard, AuthenticationRoleCheckGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true },
    };
  }
}

export class EmployeeShell {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: EmployeeShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
      data: { reuse: true },
    };
  }
}

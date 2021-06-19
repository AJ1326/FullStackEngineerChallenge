# Objective

To create a dashboard where admin can Add/edit/delete employees and can feedback about them and set reviewers to review those feedbacks.

## Shell

Shells are mainly created in a project for different roles and improves the quality and loading speed of the application. It contains 2 shell:

1. One for employee view
2. Second, for Admin view
   The shell inherits on other modules as a router outlet and these modules render around it.

## Modules

It consists of 4 modules:
App module
Shared module
Shell module
Employee shell module

\*Lazy routing is not taken into consideration

## Home module

It consists of 4 child components. And these components include sub modules that are defined in the shared module.

1. Employee list
   1. Search
   2. Add employee
2. Feedback list
   1. Search
   2. Add employee
3. Review list
   1. Search
   2. Add employee
4. Documentation
   It includes documentation of the project.

## Shared module

It includes the components that can be used throughout the project.

1. Search product component
2. Tabular representation of products (primeng)
3. Custom modal component (you can design custom modal)
4. Spinner for showing http requests.
5. Confirm dialog component that work as alert modal.

Run Project

# Getting started

1. Go to project folder and install dependencies:

```bash
npm install
```

2. Launch development server, and open `localhost:4200` in your browser:

```bash
npm start
```

# Project structure

```
dist/                        compiled version
docs/                        project docs and coding guides
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- @core/                 core module (singleton services and single-use components)
|  |- @shared/               shared module  (common components, directives and pipes)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global scss variables and theme
|- translations/             translations files
|- index.html                html entry point
|- main.scss                 global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- test.ts                   unit tests entry point
reports/                     test and coverage reports
proxy.conf.js                backend proxy configuration
```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Tasks                         | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| npm start                     | Run development server on `http://localhost:4200/`       |
| npm run build [-- --env=prod] | Lint code and build app for production in `dist/` folder |
| npm run lint                  | Lint code                                                |

When building the application, you can specify the target environment using the additional flag `--env <name>` (do not
forget to prepend `--` to pass arguments to npm scripts).

The default build environment is `prod`.

# Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.
You should not use `ng serve` directly, as it does not use the backend proxy configuration by default.

### Libraries

- [Angular](https://angular.io)
- [Bootstrap 4](https://getbootstrap.com)
- [Font Awesome](http://fontawesome.io)
- [RxJS](http://reactivex.io/rxjs)
- [ng-bootstrap](https://ng-bootstrap.github.io)
- [ngx-translate](https://github.com/ngx-translate/core)
- [Lodash](https://lodash.com)

### Coding guides

- [Angular](docs/coding-guides/angular.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [Sass](docs/coding-guides/sass.md)
- [HTML](docs/coding-guides/html.md)
- [Unit tests](docs/coding-guides/unit-tests.md)
- [End-to-end tests](docs/coding-guides/e2e-tests.md)

# React Project Standard For Retail Core Banking Development

This standard has been prepared to guide developers on the quality, structural, style expectation on this project.

The focus is on creating maintainable code. The architecture allows the developer to create a codebase that is easy to understand and promotes reusability, modularity, and encapsulation of UI elements and their associated logic.

The aim is for the developers to maintain a well-defined and standard style of coding called coding standards, developers would adopt [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#readme) and provided [code standard](https://gist.github.com/ndrymes/fe9c7dc808e6f9f4291f0ee97d0530b7#file-readme-md). It is very important for all developers to maintain the coding standards otherwise the code will be rejected during code review.

## Table of Contents

1. [Purpose](#Purpose)
2. [Tools & Technologies](#Tools--Technologies)
3. [Basic Rules](#Basic-Rules)
4. [Declaration](#Declaration)
5. [Folder Structure](#Folder-Structure)
6. [Lazy Loading](#Lazy-Loading)
7. [Set Up Eslint, Airbnb Style Guide](#Set-Up-Eslint,-Airbnb-Style-Guide)
8. [Set Up Husky](#Set-Up-Husky)
9. [Git Branch Naming Convention](#Git-Branch-Naming-Convention)
10. [Code Push, Review Approach](#Code-Push,-Review-Approach)
11. [Conclusion](#Conclusion)

## Purpose

The goal of these guidelines is to create uniform coding habits among software personnel in the engineering department so that reading, checking, and maintaining code written by different persons becomes easier. The intent of these standards is to define a natural style and consistency, yet leave to the developer, the freedom to practice their craft without unnecessary burden.

## Tools & Technologies

The Retail core banking project was written with the following basic technologies.

```
1. Language - Javascript
2. Framework - React
3. Code Scan - SonarQube
```

## Basic Rules

- Only include one React component per file.
- Always use TSX syntax.

## Declaration

- Do not use `displayName` for naming components. Instead, name the component by reference.

  ```jsx
  // bad
  export default React.createClass({
      displayName: 'ReservationCard',
      // stuff goes here
  });

  // good
  export default function ReservationCard(props) {
      return ()
  }
  ```

## Folder Structure

A folder structure sample is shown below using Product Factory as a case study.

product-factory-folder-structure-guide

```
.
├── .husky
├── node modules
├── public
├── src/
│   ├── assets
│   ├── componenets
│   ├── contexts
│   ├── enums
│   ├── hooks
│   ├── layouts
│   ├── fragments
│   ├── pages
│   ├── redux/
│   │   ├── slices
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── routes
│   ├── services
│   ├── styles
│   ├── types
│   └── utilities
├── .eslintrc.json
├── .prettierignore
├── .gitignore
├── App.css
├── App.tsx
├── index.css
├── index.tsx
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Lazy Loading

Developers shall be using Lazy Loading on route level to load components, modules, or other assets asynchronously, only when they are needed. It will help to optimize the initial loading time for the application by splitting it into smaller chunks and loading them on-demand.

```
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

const App = () => {
  return (
    <>
      ...

      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
```

## Set Up Eslint, Airbnb Style Guide

Developers shall be using [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#readme) to ensure clean and consistent code. To set up the Airbnb style guide , you need to use a linting tool like ESlint. The link below provide a step by step approach to setting up eslint [ESLint Set-up Procedure](https://www.makeuseof.com/eslint-with-airbnb-javascript-style-guide/)

### Naming

- **List itemExtensions**: Use `.jsx` extension for React components. eslint: [`react/jsx-filename-extension`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md)
- **Filename**: Use `PascalCase` for filenames. E.g., **ReservationCard**.jsx.
- **Reference Naming**: Use `PascalCase` for React components and `camelCase` for their instances.

  ```jsx
  // bad
  import reservationCard from './ReservationCard'

  // good
  import ReservationCard from './ReservationCard'

  // bad
  const ReservationItem = <ReservationCard />

  // good
  const reservationItem = <ReservationCard />
  ```

- **Component Naming**: Use the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.jsx` as the filename and use the directory name as the component name:

  ```jsx
  // bad
  import Footer from './Footer/Footer'

  // bad
  import Footer from './Footer/index'

  // good
  import Footer from './Footer'
  ```

- **Higher-order Component Naming**: Use a composite of the higher-order component’s name and the passed-in component’s name as the `displayName` on the generated component. For example, the higher-order component `withFoo()`, when passed a component `Bar` should produce a component with a `displayName` of `withFoo(Bar)`.

  > Why? A component’s displayName may be used by developer tools or in error messages, and having a value that clearly expresses this relationship helps people understand what is happening.

  ```jsx
  // bad
  export default function withFoo(WrappedComponent) {
      return function WithFoo(props) {
          return <WrappedComponent {...props} foo />;
      }
  }

  // good
  export default function withFoo(WrappedComponent) {
      function WithFoo(props) {
          return <WrappedComponent {...props} foo />;
      }

      const wrappedComponentName = WrappedComponent.displayName
          || WrappedComponent.name
          || 'Component';

      WithFoo.displayName = `withFoo(${wrappedComponentName})`;
      return WithFoo;
  }
  ```

### Alignment

- Follow these alignment styles for JSX syntax. eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md) [`react/jsx-closing-tag-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md)

  ```jsx
  // bad
  <Foo superLongParam="bar"
      anotherSuperLongParam="baz" />

  // good
  <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
  />

  // if props fit in one line then keep it on the same line
  <Foo bar="bar" />

  // children get indented normally
  <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
  >
      <Quux />
  </Foo>

  // bad
  {showButton &&
      <Button />
  }

  // bad
  {
      showButton &&
          <Button />
  }

  // good
  {showButton && (
      <Button />
  )}

  // good
  {showButton && <Button />}

  // good
  {someReallyLongConditional
      && anotherLongConditional
      && (
          <Foo
          superLongParam="bar"
          anotherSuperLongParam="baz"
          />
      )
  }

  // good
  {someConditional ? (
      <Foo />
  ) : (
      <Foo
          superLongParam="bar"
          anotherSuperLongParam="baz"
      />
  )}
  ```

### Props

- Always use **camelCase** for prop names, or **PascalCase** if the prop value is a React component.

  ```jsx
  // bad
  <Foo
      UserName="hello"
      phone_number={12345678}
  />

  // good
  <Foo
      userName="hello"
      phoneNumber={12345678}
      Component={SomeComponent}
  />
  ```

- Omit the value of the prop when it is explicitly true. eslint: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

  ```jsx
  // bad
  <Foo
      hidden={true}
  />

  // good
  <Foo
      hidden
  />

  // very good
  <Foo hidden />
  ```

- Avoid using an array index as key prop, prefer a stable ID. eslint: [`react/no-array-index-key.`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)

> Why? A component’s displayName may be used by developer tools or in error messages, and having a value that clearly expresses this relationship helps people understand what is happening.

We don’t recommend using indexes for keys if the order of items may change.

    ```jsx
    // bad
    {todos.map((todo, index) =>
        <Todo
            {...todo}
            key={index}
        />
    )}

    // good
    {todos.map(todo => (
        <Todo
            {...todo}
            key={todo.id}
        />
    ))}
    ```

- Always define explicit defaultProps for all non-required props.

> Why? propTypes are a form of documentation, and providing defaultProps means the reader of your code doesn’t have to assume as much. In addition, it can mean that your code can omit certain type checks.

    ```jsx
    // bad
    function SFC({ foo, bar, children }) {
        return <div>{foo}{bar}{children}</div>;
    }
    SFC.propTypes = {
        foo: PropTypes.number.isRequired,
        bar: PropTypes.string,
        children: PropTypes.node,
    };

    // good
    function SFC({ foo, bar, children }) {
        return <div>{foo}{bar}{children}</div>;
    }
    SFC.propTypes = {
        foo: PropTypes.number.isRequired,
        bar: PropTypes.string,
        children: PropTypes.node,
    };
    SFC.defaultProps = {
        bar: '',
        children: null,
    };
    ```

- Use spread props sparingly. > Why? Otherwise you’re more likely to pass unnecessary props down to components. And for React v15.6.1 and older, you could [`pass invalid HTML attributes to the DOM`](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html).

Exceptions:

- Spreading objects with known, explicit props. This can be particularly useful when testing React components with Mocha’s beforeEach construct.

  ```jsx
  export default function Foo {
      const props = {
          text: '',
          isPublished: false
      }

      return (<div {...props} />);
  }
  ```

  Notes for use:

Filter out unnecessary props when possible. Also, use [`prop-types-exact`](https://www.npmjs.com/package/prop-types-exact) to help prevent bugs.

    ```jsx
    render() {
        const { irrelevantProp, ...relevantProps } = this.props;
        return <WrappedComponent {...this.props} />
    }

    // good
    render() {
        const { irrelevantProp, ...relevantProps } = this.props;
        return <WrappedComponent {...relevantProps} />
    }
    ```

### Refs

- Always use ref callbacks. eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

  ```jsx
  // bad
  <Foo
      ref="myRef"
  />

  // good
  <Foo
      ref={(ref) => { this.myRef = ref; }}
  />
  ```

### Parentheses

- Wrap JSX tags in parentheses when they span more than one line. eslint: [`react/jsx-wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)

  ```jsx
  // bad
  render() {
      return <MyComponent variant="long body" foo="bar">
                  <MyChild />
              </MyComponent>;
  }

  // good
  render() {
      return (
          <MyComponent variant="long body" foo="bar">
              <MyChild />
          </MyComponent>
      );
  }

  // good, when single line
  render() {
      const body = <div>hello</div>;
      return <MyComponent>{body}</MyComponent>;
  }
  ```

## Set Up Husky

Developers shall be using Husky before a commit to run specific scripts or commands to perform tasks such as code linting, running tests, or formatting checks before the changes are committed.This helps ensure that the committed code meets the project's quality standards. The link below provide a step by step approach to setting up husky [Husky Set-up Procedure](https://www.freecodecamp.org/news/how-to-add-commit-hooks-to-git-with-husky-to-automate-code-tasks/)

## Git Branch Naming Convention

Developers shall enforce the following rule for naming branch for good understanding of what feature or activity is carried out by developers

```
- feature branch: ft-module_name-activity
  e.g ft-charge-creation
```

note: activity should be based on the feature required e.g in product-factory we have creation, modification, reactivation, deactivation etc

```
- fix branch: bugfix-module_name-activity
  e.g bugfix-charge-creation
```

note: when a developer is making a fix to a feature this should be implemented on the created fix branch.

note: your code would be rejected if this convention is not followed

## Code Push, Review Approach

Before pushing your code and creating a PR, make sure your code follow the laid down guideline by using eslint and other means stated in this guideline. For code review, developer shall assign a developer, the lead and the client reveiwer to perform code review before your code would be merge to the main branch.

## Conclusion

This is a live document and shall be updated periodically. This shall be adopted after client approval.

# sterling-retailcore-global-product-org

## Overview

Welcome to Sterling Retailcore Global Product Organisation. This readme file provides essential information on how to get started with the project, set up your development environment, and contribute to the codebase.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Environment Configuration](#environment-configuration)
   - [Run the Project](#run-the-project)
   - [Connecting the Local Microfrontend to the Deployed App](#connecting-the-local-microfrontend-to-the-deployed-app)
3. [Contributing](#contributing)
   - [Coding Style](#coding-style)
   - [Pull Requests](#pull-requests)
4. [Issue Tracking](#issue-tracking)

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 18.16.0 or higher)
- [npm](https://www.npmjs.com/) (version 9.5.1 or higher)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/[organisation-name]/[project-name].git
cd [project-name]
```

### Install Dependencies

```bash
npm install
```

**or**

```bash
npm install --force
```

### Environment Configuration

Before running the project, you need to set up the environment variables if it doesn't exist. Create a folder named `environments` in the root of the project and in the folder create a file named `.env`. Add the following environment variables:

```env
REVENT_BASE_URL=[product-api-base-url]
PRUNEDGE_AUTH_URL=[auth-api-base-url]
```

Make sure to replace the placeholder values with the actual values.

### Run the Project

To start the project, run the following two commands consecutively in your terminal:

```bash
npm run dev
npm run tw
```

`npm run tw` compiles tailwind classes to css code.

Visit https://localhost:8082 in your browser. The port can also be changed in the `webpack.config.js` file.

### Connecting the Local Microfrontend to the Deployed App

1. Navigate to the URL of the deployed app then open the developer tools.

1. Run the following command in the console:

   ```javascript
   localStorage.setItem('devtools', true)
   ```

1. Refresh the page.

1. Click on the yellow square icon at the bottom right of the screen.

1. Search for the project name and click on it.

1. Input the port number of the app (8082) and click on `Apply Override`.

1. Reload the page, and the local microfrontend will be running there.

## Contributing

To get started:

Create a new branch for your feature or bug fix:

```
- feature branch: ft-module_name-activity
  e.g ft-gpo-creation
```

**Note: `activity` should be based on the feature required e.g in global-product-org we have creation, modification, reactivation, deactivation etc**

```
- fix branch: bugfix-module_name-activity
  e.g bugfix-gpo-creation
```

**Note: when a developer is making a fix to a feature this should be implemented on the created fix branch.**

### Coding Style

Follow the coding style guidelines outlined in [CODING_STYLE.md](/CODING_STYLE.md).

### Pull Requests

When your feature is ready, open a pull request. Make sure to provide a detailed description of your changes.

## Issue Tracking

If you encounter any issues or have feature requests, please open an issue.

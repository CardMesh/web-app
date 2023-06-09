<h1 align="center">Web app for CardMesh</h1>

[![CI status](https://github.com/CardMesh/web-app/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/CardMesh/web-app/actions/workflows/ci.yml)
[![Contributors](https://img.shields.io/github/contributors/CardMesh/web-app.svg)](https://github.com/CardMesh/web-app/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/CardMesh/web-app.svg)](https://github.com/CardMesh/web-app/network/members)
[![Stargazers](https://img.shields.io/github/stars/CardMesh/web-app.svg)](https://github.com/CardMesh/web-app/stargazers)
[![Issues](https://img.shields.io/github/issues/CardMesh/web-app.svg)](https://github.com/CardMesh/web-app/issues)
[![MIT License](https://img.shields.io/github/license/CardMesh/web-app.svg)](https://github.com/CardMesh/web-app/blob/develop/LICENSE)

CardMesh is an app aimed at modernizing the sharing of business cards within a company. It displays digital business
cards in a web browser, accessible via NFC tags, QR codes, or direct URLs.

### Tech Stack

[![Svelte](https://img.shields.io/badge/Svelte-FF3E00?logo=svelte&style=flat&logoColor=fff)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=flat)](#)
[![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=flat&logo=bootstrap&logoColor=white)](#)
[![Sass](https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff&style=flat)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff&style=flat)](#)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)](#)

### Versions & Dependencies

| Version | Documentation |
|---------|---------------|
| 1.0.0   | current       |

### Requirements

- `Node.js` >= 20.0

## Documentation

## Steps to setup

**1. Clone the application**

```bash
git clone git@github.com:CardMesh/web-app.git && cd web-app
```

**2. Configure your private `.env` file, following the `.env-sample sample`**

**3. Run the app**

```bash
npm run dev # dev
```

```bash
npm run build && npm run preview # dev
```

```bash
npm run build && npm run start # prod
```

#### Docker

If you're considering deploying using docker-compose, here's a simple example. Please see `./docker-compose.yml`.

```bash
docker-compose up -d
```

### Roadmap

See the [open issues](https://github.com/CardMesh/web-app/issues) for a complete list of proposed
features (and known issues).

### Contributing

If you have a suggestion to enhance this project, kindly fork the repository and create a pull request. Alternatively,
you may open an issue and tag it as "enhancement". Lastly, do not hesitate to give the project a star ⭐. Thank you for
your support.

#### Tools

Coding standards checker:

```bash
npm run lint
```

Coding standards fixer:

```bash
npm run format
```

Unit tests:

```bash
npm run test
```

#### Build tools

Move bootstrap to `./static`. Used when bootstrap is updated:

```bash
npm run build:bootstrap
```

Build all favicons:

```bash
npm run build:favicons
```

### License

The distribution of the package operates under the `MIT License`. Further information can be found in the LICENSE file.

<h1 align="center">Web app for CardMesh</h1>

[![CI status](https://github.com/CardMesh/web-app/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/CardMesh/web-app/actions/workflows/ci.yml)
[![Contributors](https://img.shields.io/github/contributors/CardMesh/web-app.svg)](https://github.com/CardMesh/web-app/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/CardMesh/web-app.svg)](https://github.com/CardMesh/web-app/network/members)
[![Stargazers](https://img.shields.io/github/stars/CardMesh/web-app.svg)](https://github.com/CardMesh/web-app/stargazers)
[![Issues](https://img.shields.io/github/issues/CardMesh/web-app.svg)](https://github.com/CardMesh/web-app/issues)
[![MIT License](https://img.shields.io/github/license/CardMesh/web-app.svg)](https://github.com/CardMesh/web-app/blob/main/LICENSE)

CardMesh is an app aimed at modernizing the sharing of business cards within a company. It displays digital business
cards in a web browser, accessible via NFC tags, QR codes, or direct URLs.

### Tech Stack

[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&style=flat&logoColor=fff)](#)
[![Sass](https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff&style=flat)](#)
[![Javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)](#)
[![Node.Js](https://img.shields.io/badge/Node.js-339933.svg?style=flat&logo=nodedotjs&logoColor=white)](#)
[![Svelte](https://img.shields.io/badge/Svelte-FF3E00?logo=svelte&style=flat&logoColor=fff)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=flat)](#)
[![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=flat&logo=bootstrap&logoColor=white)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff&style=flat)](#)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)](#)

### Versions & Dependencies

| Version | Documentation |
|---------|---------------|
| 1.0.4   | current       |

### Requirements

- `Node.js` >= 18.x

## Documentation

## Steps to setup

**1. Clone the application**

```bash
git clone git@github.com:CardMesh/web-app.git && cd web-app
```

**2. Configure your private `.env` file, following the `.env.example` sample**

**3. In `svelte.config.js` you can define the adapter.
If you want to run this on a node server, use:**

```javascript
import adapter from '@sveltejs/adapter-node';
```

**4. Run the app**

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

### DISCLAIMER: USE OF THIS GITHUB REPOSITORY

By accessing and using this GitHub repository ("Repository"), you agree to the following terms and conditions. If you do
not agree with any of these terms, please refrain from using the Repository.

1) No Warranty or Liability:
   The Repository is provided on an "as is" basis, without any warranties or representations of any kind, either
   expressed or implied. The owner(s) of the Repository ("Owner") hereby disclaim(s) any and all liability for any
   damages, losses, or injuries arising out of or in connection with the use, inability to use, or reliance on the
   Repository.

2) No Legal Advice:
   The content and information provided in the Repository are for informational purposes only and do not constitute
   legal advice. The Owner does not assume any responsibility for any actions taken or not taken based on the
   information provided in the Repository. For legal advice or specific inquiries, consult a qualified legal
   professional.

3) Intellectual Property:
   The Repository may contain copyrighted materials, including but not limited to code, documentation, images, and other
   intellectual property owned by the Owner or third parties. You may not use, copy, distribute, or modify any such
   materials without obtaining prior written permission from the respective copyright holder(s).

4) External Links:
   The Repository may include links to third-party websites or resources. The Owner does not endorse, control, or assume
   any responsibility for the content or practices of these third-party websites or resources. Accessing and using such
   links are solely at your own risk.

5) Modification of Repository:
   The Owner reserves the right to modify, update, or remove any content or functionality of the Repository at any time
   without prior notice. The Owner shall not be liable for any consequences arising from such modifications.

6) Indemnification:
   You agree to indemnify and hold the Owner harmless from and against any claims, damages, liabilities, costs, and
   expenses arising out of or in connection with your use of the Repository, including but not limited to any violation
   of these terms.

7) Governing Law:
   These terms shall be governed by and construed in accordance with the laws of the jurisdiction where the Owner is
   located, without regard to its conflict of law principles.

By using the Repository, you acknowledge that you have read, understood, and agreed to these terms and conditions. If
you do not agree with any of these terms, your sole remedy is to discontinue using the Repository.

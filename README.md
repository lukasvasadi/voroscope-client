# Voroscope Client

Voroscope is an automated imaging platform based on the open-source Voron V0 3D printer build.

## Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [License](#license)

## Introduction

The Voroscope client software is built using Electron and React, written in TypeScript. A websocket connection is established between the remote computer and Raspberry Pi controller. Hardware configurations, gcode commands, and imaging data are transmitted via this remote connection.

Initial setup of this application follows this [Electron-React tutorial](https://lukasvasadi.github.io/posts/electron-react.html).

This project requires the websocket package and TypeScript dev dependencies:

```bash
npm i --save websocket
npm i --save-dev @types/websocket
```

Also the standard [FontAwesome React components](https://fontawesome.com/v5/docs/web/use-with/react):

```bash
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome
```

## Installation

To run this application on a new machine, first clone the repository:

```bash
git clone git@github.com:lukasvasadi/voroscope-client-typescript.git
```

Then install the package dependencies:

```bash
npm i
```

And finally, run the start command to launch the application:

```bash
npm run start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

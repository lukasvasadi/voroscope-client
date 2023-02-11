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

```zsh
npm i --save websocket
npm i --save-dev @types/websocket
```

Also the standard [FontAwesome React components](https://fontawesome.com/v5/docs/web/use-with/react):

```zsh
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome
```

## Installation

To run this application on a new machine, first clone the repository:

```zsh
git clone git@github.com:lukasvasadi/voroscope-client-typescript.git
```

Then install the package dependencies:

```zsh
npm i
```

And finally, run the start command to launch the application:

```zsh
npm run start
```

## Converting png image files to icns (macOS)

```zsh
cd assets
mkdir icon.iconset
cp icon1024.png icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset
rm -R icon.iconset
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

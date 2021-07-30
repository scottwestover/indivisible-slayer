# Indivisible Slayer (RNDGAME JAM II Submission)

![License](https://img.shields.io/badge/license-MIT-green)

Play the game on Itch.io here: <a href="https://galemius.itch.io/indivisible-slayer" target="_blank">Indivisible Slayer</a>

This is a game that I created as part of the <a href="https://itch.io/jam/rndgame-jam-2" target="_blank">RNDGAME JAM II</a> game jam. The game was created using <a href="https://phaser.io/" target="_blank">Phaser 3</a> and <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>.

<p align="center">
  <img src="./.github/image1.png?raw=true" height="300" title="Title Screen">
  <img src="./.github/image2.png?raw=true" height="300" alt="Gameplay Screenshot">
  <img src="./.github/image4.png?raw=true" height="300" alt="Gameplay Screenshot 2">
</p>

The game is a simple puzzle game were your goal is to get the highest score possible by slaying the indivisible numbers. As you complete more and more rounds the game becomes harder by having the numbers rotate around, and you will lose points by slaying a divisible number.

The following assets were used in the creation of this game:
- <a href="https://www.kenney.nl/assets/kenney-fonts" target="_blank">Fonts: Kennys Fonts</a>
- <a href="https://soundcloud.com/mcfunkypants2018/rise-and-shine" target="_blank">Background Audio: Mcfunkypants - Rise and Shine</a>

<p align="center">
  <img src="./.github/image3.png?raw=true" height="300" title="Game Topic">
</p>

## Running The Project Locally

### Requirements

[Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com/) are required to install dependencies and run scripts via `yarn`.

[Parcel](https://parceljs.org/getting_started.html) is required to bundle and serve the web application. You can install Parcel by running the following command: `yarn global add parcel-bundler`.

### Available Commands

| Command | Description |
|---------|-------------|
| `yarn install --frozen-lockfile` | Install project dependencies |
| `yarn start` | Build project and open web server running project |
| `yarn build` | Builds code bundle for production |

### Writing Code

After cloning the repo, run `yarn install --frozen-lockfile` from your project directory. Then, you can start the local development
server by running `yarn start`.

After starting the development server with `yarn start`, you can edit any files in the `src` folder
and parcel will automatically recompile and reload your server (available at `http://localhost:8080`
by default).

### Deploying Code

After you run the `yarn build` command, your code will be built into a single bundle located at
`dist/bundle.min.js` along with any other assets you project depended.

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://myserver.com`),
you should be able to open `http://myserver.com/index.html` and play your game.

### Linting

This project uses `typescript-eslint` for linting, and it has been setup to extend the [airbnb](https://github.com/airbnb/javascript) style guide. To modify these settings, you will need to update the `.eslintrc.js` file with your plugins, rules, etc.

### Static Assets

Any static assets like images or audio files should be placed in the `public` folder. It'll then be served at `http://localhost:8080/path-to-file-your-file/file-name.file-type`.

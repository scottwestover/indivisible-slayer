const roundHalf = (num) => Math.round(num * 2) / 2;
const graphicsSettings = { best: 1, medium: 0.75, low: 0.5 };
const DPR = window.devicePixelRatio * graphicsSettings.best;
const { width, height } = window.screen;
const WIDTH = Math.round(Math.min(width, height) * DPR);
const HEIGHT = Math.round(Math.max(width, height) * DPR);

export const ASSETS_DPR = roundHalf(Math.min(Math.max(HEIGHT / 360, 1), 4));
export const GAME_WIDTH = WIDTH;
export const GAME_HEIGHT = HEIGHT;
export const TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'KennyBlocks',
  fontSize: '128px',
};
export const NUMBER_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'KennyFutureNarrow',
  fontSize: '256px',
};
export const GRID_ROWS = 11;
export const GRID_COLS = 11;
export const BACKGROUND_COLOR = '#1A1A1D';

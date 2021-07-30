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
  color: 'white',
  align: 'center',
};
export const NUMBER_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'KennyFutureNarrow',
  fontSize: '256px',
  color: 'white',
};
export const CORRECT_NUMBER_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'KennyBlocks',
  fontSize: '128px',
  color: 'green',
};
export const FLOATING_NUMBER_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'KennyBlocks',
  fontSize: '72px',
  color: 'white',
};
export const GRID_ROWS = 11;
export const GRID_COLS = 11;
export const BACKGROUND_COLOR = '#1A1A1D';
export const INCREMENT_SCORE_VALUE = 10;
export const STORAGE_HIGH_SCORE_KEY = 'INDIVISIBLE_SLAYER_HIGH_SCORE';
export const INCREMENT_DIFFICULTY_VALUE = 0.004;
export const GAME_TIME = 30;
export const DEBUG_SHOW_CORRECT_NUMBERS = false;
export const DEBUG = false;

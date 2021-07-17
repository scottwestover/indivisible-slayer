import { GameObject } from './game-object';

/**
 * Scales a Phaser Game Object based on the size of the scene width and percent that is provided.
 * @param gameObject The Phaser.GameObjects.GameObject that needs to be scaled.
 * @param sceneWidth The width of the Phaser.Scene.
 * @param percent The percent of the sceneWidth the gameObject should be scaled to.
 *                This value should be between 0 and 1.
 * @returns void
 */
export function scaleGameObjectToGameWidth(
  gameObject: GameObject, sceneWidth: number, percent: number,
): void {
  gameObject.displayWidth = sceneWidth * percent;
  gameObject.scaleY = gameObject.scaleX;
}

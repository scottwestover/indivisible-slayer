import {
  defineQuery, defineSystem, enterQuery, exitQuery, IWorld, System,
} from 'bitecs';
import Phaser from 'phaser';
import Position from '../components/position';
import Sprite from '../components/sprite';

const spritesById = new Map<number, Phaser.GameObjects.Sprite>();
const spriteQuery = defineQuery([Sprite, Position]);
const spriteQueryEnter = enterQuery(spriteQuery);
const spriteQueryExit = exitQuery(spriteQuery);

export default function createSpriteSystem(scene: Phaser.Scene, textures: string[]): System {
  return defineSystem((world: IWorld) => {
    const enterEntities = spriteQueryEnter(world);
    for (let i = 0; i < enterEntities.length; i += 1) {
      const id = enterEntities[i];
      const textureId = Sprite.texture[id];
      const texture = textures[textureId];
      spritesById.set(id, scene.add.sprite(0, 0, texture));
    }

    const entities = spriteQuery(world);
    for (let i = 0; i < entities.length; i += 1) {
      const id = entities[i];
      const sprite = spritesById.get(id);

      if (sprite) {
        sprite.x = Position.x[id];
        sprite.y = Position.y[id];
      }
    }

    const exitEntities = spriteQueryExit(world);
    for (let i = 0; i < exitEntities.length; i += 1) {
      const id = exitEntities[i];
      const sprite = spritesById.get(id);

      if (sprite) {
        sprite.destroy();
        spritesById.delete(id);
      }
    }

    return world;
  });
}

import { Position } from './types';

export class Boundary {
  static width = 40;
  static height = 40;

  public c;
  public position;
  public width;
  public height;
  public image;

  constructor({
    c,
    position,
    image,
  }: {
    c: CanvasRenderingContext2D;
    position: Position;
    image: HTMLImageElement;
  }) {
    this.c = c;
    this.position = position;
    this.width = Boundary.width;
    this.height = Boundary.height;
    this.image = image;
  }

  draw() {
    this.c.drawImage(this.image, this.position.x, this.position.y);
  }
}

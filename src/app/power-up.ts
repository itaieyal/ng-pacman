import { Position } from './types';

export class PowerUp {
  public c;
  public position;
  public radius;

  constructor({
    c,
    position,
  }: {
    c: CanvasRenderingContext2D;
    position: Position;
  }) {
    this.c = c;
    this.position = position;
    this.radius = 5;
  }

  draw() {
    this.c.beginPath();
    this.c.fillStyle = 'white';
    this.c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.c.fill();
    this.c.closePath();
  }
}

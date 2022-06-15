import { Position, Velocity } from './types';

export class Ghost {
  static speed = 2;

  public c;
  public position;
  public velocity;
  public radius;
  public color;
  public prevCollisions: string[];
  public speed;
  public scared;

  constructor({
    c,
    position,
    velocity,
    color = 'red',
  }: {
    c: CanvasRenderingContext2D;
    position: Position;
    velocity: Velocity;
    color?: string;
  }) {
    this.c = c;
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.color = color;
    this.prevCollisions = [];
    this.speed = Ghost.speed;
    this.scared = false;
  }

  draw() {
    this.c.beginPath();
    this.c.fillStyle = this.scared ? 'blue' : this.color;
    this.c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.c.fill();
    this.c.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

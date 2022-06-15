import { Position, Velocity } from './types';

export class Player {
  public c;
  public position;
  public velocity;
  public radius;
  public radians;
  public openRate;
  public rotation;

  constructor({
    c,
    position,
    velocity,
  }: {
    c: CanvasRenderingContext2D;
    position: Position;
    velocity: Velocity;
  }) {
    this.c = c;
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.radians = 0.75;
    this.openRate = 0.05;
    this.rotation = 0;
  }

  draw() {
    this.c.save();
    this.c.translate(this.position.x, this.position.y);
    this.c.rotate(this.rotation);
    this.c.translate(-this.position.x, -this.position.y);

    this.c.beginPath();
    this.c.fillStyle = 'yellow';
    this.c.arc(
      this.position.x,
      this.position.y,
      this.radius,
      this.radians,
      Math.PI * 2 - this.radians
    );
    this.c.lineTo(this.position.x, this.position.y);
    this.c.fill();
    this.c.closePath();
    this.c.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.radians < 0 || this.radians > 0.75) {
      this.openRate = -this.openRate;
    }
    this.radians += this.openRate;
  }
}

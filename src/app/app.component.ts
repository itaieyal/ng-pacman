import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Boundary } from './boundary';
import { Ghost } from './ghost';
import { Pellet } from './pellet';
import { Player } from './player';
import { PowerUp } from './power-up';
import {
  CircularElement,
  Position,
  RectangularElement,
  Velocity,
} from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // @ts-ignore
  @ViewChild('canvasEl') canvasRef: ElementRef<HTMLCanvasElement>;
  // @ts-ignore
  @ViewChild('scoreEl') scoreElRef: ElementRef<HTMLSpanElement>;

  public canvas?: HTMLCanvasElement;
  public scoreEl?: HTMLSpanElement;
  public ctx?: CanvasRenderingContext2D;

  constructor() {}

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.scoreEl = this.scoreElRef.nativeElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.run();
  }

  createImage(src: string) {
    const image = new Image();
    image.src = src;
    return image;
  }

  run() {
    if (!this.scoreEl) {
      return;
    }
    if (!this.canvas) {
      return;
    }
    if (this.ctx === undefined) {
      return;
    }
    const ctx = this.ctx;
    const canvas = this.canvas;
    const scoreEl = this.scoreEl;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const boundaries: Boundary[] = [];
    const pellets: Pellet[] = [];
    const powerUps: PowerUp[] = [];
    const ghosts = [
      new Ghost({
        c: ctx,
        position: {
          x: Boundary.width * 6 + Boundary.width / 2,
          y: Boundary.height + Boundary.height / 2,
        } as Position,
        velocity: {
          x: Ghost.speed,
          y: 0,
        } as Velocity,
      }),
      new Ghost({
        c: ctx,
        position: {
          x: Boundary.width * 6 + Boundary.width / 2,
          y: Boundary.height * 3 + Boundary.height / 2,
        },
        velocity: {
          x: Ghost.speed,
          y: 0,
        },
        color: 'pink',
      }),
      new Ghost({
        c: ctx,
        position: {
          x: Boundary.width * 3 + Boundary.width / 2,
          y: Boundary.height * 8 + Boundary.height / 2,
        },
        velocity: {
          x: Ghost.speed,
          y: 0,
        },
        color: 'green',
      }),
    ];

    const player = new Player({
      c: ctx,
      position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
      },
      velocity: { x: 0, y: 0 },
    });

    const keys = {
      w: {
        pressed: false,
      },
      a: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
    };

    let lastKey = '';
    let score = 0;

    const map = [
      ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
      ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
      ['|', '.', 'b', '.', '<', '7', '>', '.', 'b', '.', '|'],
      ['|', '.', '.', '.', '.', 'u', '.', '.', '.', '.', '|'],
      ['|', '.', '<', '>', '.', '.', '.', '<', '>', '.', '|'],
      ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
      ['|', '.', 'b', '.', '<', 'x', '>', '.', 'b', '.', '|'],
      ['|', '.', '.', '.', '.', 'u', '.', '.', '.', '.', '|'],
      ['|', '.', '<', '>', '.', '.', '.', '<', '>', '.', '|'],
      ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
      ['|', '.', 'b', '.', '<', '5', '>', '.', 'b', '.', '|'],
      ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
      ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3'],
    ];

    map.forEach((row, yIndex) =>
      row.forEach((symbol, xIndex) => {
        switch (symbol) {
          case '-':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/pipeHorizontal.png'),
              })
            );
            break;
          case '|':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/pipeVertical.png'),
              })
            );
            break;
          case '1':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/pipeCorner1.png'),
              })
            );
            break;
          case '2':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/pipeCorner2.png'),
              })
            );
            break;
          case '3':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/pipeCorner3.png'),
              })
            );
            break;
          case '4':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/pipeCorner4.png'),
              })
            );
            break;
          case 'b':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/block.png'),
              })
            );
            break;
          case 'u':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/capBottom.png'),
              })
            );
            break;
          case '<':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/capLeft.png'),
              })
            );
            break;
          case '>':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/capRight.png'),
              })
            );
            break;
          case '^':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/capTop.png'),
              })
            );
            break;
          case '5':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/pipeConnectorTop.png'),
              })
            );
            break;
          case '6':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/pipeConnectorRight.png'),
              })
            );
            break;
          case '7':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/pipeConnectorBottom.png'),
              })
            );
            break;
          case '8':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/pipeConnectorLeft.png'),
              })
            );
            break;
          case 'x':
            boundaries.push(
              new Boundary({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width,
                  y: yIndex * Boundary.height,
                },
                image: this.createImage('./assets/pipeCross.png'),
              })
            );
            break;
          case '.':
            pellets.push(
              new Pellet({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width + Boundary.width / 2,
                  y: yIndex * Boundary.height + Boundary.height / 2,
                },
              })
            );
            break;
          case 'p':
            powerUps.push(
              new PowerUp({
                c: ctx,
                position: {
                  x: xIndex * Boundary.width + Boundary.width / 2,
                  y: yIndex * Boundary.height + Boundary.height / 2,
                },
              })
            );
            break;
          case ' ':
            break;
        }
      })
    );

    function circleCollidesWithRectangle({
      circle,
      rectangle,
    }: {
      circle: CircularElement;
      rectangle: RectangularElement;
    }) {
      const padding = Boundary.width / 2 - circle.radius - 1;
      return (
        circle.position.y - circle.radius + circle.velocity.y <=
          rectangle.position.y + rectangle.height + padding &&
        circle.position.x + circle.radius + circle.velocity.x >=
          rectangle.position.x - padding &&
        circle.position.y + circle.radius + circle.velocity.y >=
          rectangle.position.y - padding &&
        circle.position.x - circle.radius + circle.velocity.x <=
          rectangle.position.x + rectangle.width + padding
      );
    }

    let animationId;

    function animate() {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            circleCollidesWithRectangle({
              circle: {
                ...player,
                velocity: {
                  x: 0,
                  y: -5,
                },
              },
              rectangle: boundary,
            })
          ) {
            player.velocity.y = 0;
            break;
          } else {
            player.velocity.y = -5;
          }
        }
      } else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            circleCollidesWithRectangle({
              circle: {
                ...player,
                velocity: {
                  x: 0,
                  y: 5,
                },
              },
              rectangle: boundary,
            })
          ) {
            player.velocity.y = 0;
            break;
          } else {
            player.velocity.y = 5;
          }
        }
      } else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            circleCollidesWithRectangle({
              circle: {
                ...player,
                velocity: {
                  x: -5,
                  y: 0,
                },
              },
              rectangle: boundary,
            })
          ) {
            player.velocity.x = 0;
            break;
          } else {
            player.velocity.x = -5;
          }
        }
      } else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            circleCollidesWithRectangle({
              circle: {
                ...player,
                velocity: {
                  x: 5,
                  y: 0,
                },
              },
              rectangle: boundary,
            })
          ) {
            player.velocity.x = 0;
            break;
          } else {
            player.velocity.x = 5;
          }
        }
      }

      // detect ghosts collision with player
      for (let i = ghosts.length - 1; 0 <= i; i--) {
        const ghost = ghosts[i];
        if (
          Math.hypot(
            ghost.position.x - player.position.x,
            ghost.position.y - player.position.y
          ) <
          ghost.radius + player.radius
        ) {
          if (ghost.scared) {
            ghosts.splice(i, 1);
          } else {
            cancelAnimationFrame(animationId);
            console.log('you lose');
          }
        }
      }

      // win condition
      if (pellets.length === 0) {
        console.log('you win');
        cancelAnimationFrame(animationId);
      }

      // power ups
      for (let i = powerUps.length - 1; 0 <= i; i--) {
        const powerUp = powerUps[i];
        powerUp.draw();

        if (
          Math.hypot(
            powerUp.position.x - player.position.x,
            powerUp.position.y - player.position.y
          ) <
          powerUp.radius + player.radius
        ) {
          powerUps.splice(i, 1);
          score += 100;
          scoreEl.innerHTML = String(score);

          // ghosts scared

          ghosts.forEach((ghost) => {
            ghost.scared = true;
            setTimeout(() => {
              ghost.scared = false;
            }, 5000);
          });
        }
      }

      // Touch Pellets
      for (let i = pellets.length - 1; 0 <= i; i--) {
        const pellet = pellets[i];
        pellet.draw();

        if (
          Math.hypot(
            pellet.position.x - player.position.x,
            pellet.position.y - player.position.y
          ) <
          pellet.radius + player.radius
        ) {
          pellets.splice(i, 1);
          score += 10;
          scoreEl.innerHTML = String(score);
        }
      }

      boundaries.forEach((boundary) => {
        boundary.draw();
        if (
          circleCollidesWithRectangle({ circle: player, rectangle: boundary })
        ) {
          player.velocity.y = 0;
          player.velocity.x = 0;
        }
      });

      player.update();

      ghosts.forEach((ghost) => {
        ghost.update();

        const collisions: string[] = [];

        boundaries.forEach((boundary) => {
          if (
            !collisions.includes('right') &&
            circleCollidesWithRectangle({
              circle: {
                ...ghost,
                velocity: {
                  x: ghost.speed,
                  y: 0,
                },
              },
              rectangle: boundary,
            })
          ) {
            collisions.push('right');
          }
          if (
            !collisions.includes('left') &&
            circleCollidesWithRectangle({
              circle: {
                ...ghost,
                velocity: {
                  x: -ghost.speed,
                  y: 0,
                },
              },
              rectangle: boundary,
            })
          ) {
            collisions.push('left');
          }
          if (
            !collisions.includes('up') &&
            circleCollidesWithRectangle({
              circle: {
                ...ghost,
                velocity: {
                  x: 0,
                  y: -ghost.speed,
                },
              },
              rectangle: boundary,
            })
          ) {
            collisions.push('up');
          }
          if (
            !collisions.includes('down') &&
            circleCollidesWithRectangle({
              circle: {
                ...ghost,
                velocity: {
                  x: 0,
                  y: ghost.speed,
                },
              },
              rectangle: boundary,
            })
          ) {
            collisions.push('down');
          }
        });

        if (collisions.length > ghost.prevCollisions.length) {
          ghost.prevCollisions = collisions;
        }
        if (
          JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)
        ) {
          if (ghost.velocity.x > 0) {
            ghost.prevCollisions.push('right');
          } else if (ghost.velocity.x < 0) {
            ghost.prevCollisions.push('left');
          } else if (ghost.velocity.y > 0) {
            ghost.prevCollisions.push('down');
          } else if (ghost.velocity.y < 0) {
            ghost.prevCollisions.push('up');
          }
          const pathways = ghost.prevCollisions.filter((collision) => {
            return !collisions.includes(collision);
          });
          const direction =
            pathways[Math.floor(Math.random() * pathways.length)];

          switch (direction) {
            case 'down':
              ghost.velocity.y = ghost.speed;
              ghost.velocity.x = 0;
              break;
            case 'up':
              ghost.velocity.y = -ghost.speed;
              ghost.velocity.x = 0;
              break;
            case 'right':
              ghost.velocity.y = 0;
              ghost.velocity.x = ghost.speed;
              break;
            case 'left':
              ghost.velocity.y = 0;
              ghost.velocity.x = -ghost.speed;
              break;
          }
          ghost.prevCollisions = [];
        }
      });

      if (player.velocity.x > 0) {
        player.rotation = 0;
      } else if (player.velocity.x < 0) {
        player.rotation = Math.PI;
      } else if (player.velocity.y > 0) {
        player.rotation = Math.PI / 2;
      } else if (player.velocity.y < 0) {
        player.rotation = Math.PI * 1.5;
      }
    }

    animate();

    window.addEventListener('keydown', ({ key }) => {
      switch (key) {
        case 'w':
          keys.w.pressed = true;
          lastKey = 'w';
          break;
        case 's':
          keys.s.pressed = true;
          lastKey = 's';
          break;
        case 'a':
          keys.a.pressed = true;
          lastKey = 'a';
          break;
        case 'd':
          keys.d.pressed = true;
          lastKey = 'd';
          break;
      }
    });

    window.addEventListener('keyup', ({ key }) => {
      switch (key) {
        case 'w':
          keys.w.pressed = false;
          break;
        case 's':
          keys.s.pressed = false;
          break;
        case 'a':
          keys.a.pressed = false;
          break;
        case 'd':
          keys.d.pressed = false;
          break;
      }
    });
  }
}

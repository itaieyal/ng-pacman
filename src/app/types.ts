export type Position = {
  x: number;
  y: number;
};

export type Velocity = {
  x: number;
  y: number;
};

export type CircularElement = {
  position: Position;
  velocity: Velocity;
  radius: number;
};

export type RectangularElement = {
  position: Position;
  height: number;
  width: number;
};

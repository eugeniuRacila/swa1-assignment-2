import Color from "./Color";
import Position from "./Position";

export default class Tile {
  constructor(
    private _position: Position,
    private _color: Color = new Color()
  ) {}

  public get color(): Color {
    return this._color;
  }

  public get position(): Position {
    return this._position;
  }

  public set position(position: Position) {
    this._position = position;
  }
}

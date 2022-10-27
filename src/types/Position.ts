export default class Position {
  constructor(private _col: number, private _row: number) {}

  public get col() {
    return this._col;
  }

  public get row() {
    return this._row;
  }

  public isNeighborTile(neighborPosition: Position): boolean {
    if (
      this._isNeighborCol(neighborPosition.col) &&
      this._isSameRow(neighborPosition.row)
    )
      return true;

    if (
      this._isNeighborRow(neighborPosition.row) &&
      this._isSameCol(neighborPosition.col)
    )
      return true;

    return false;
  }

  private _isNeighborCol(col: number): boolean {
    return Math.abs(this.col - col) == 1;
  }

  private _isNeighborRow(row: number): boolean {
    return Math.abs(this.row - row) == 1;
  }

  private _isSameCol(col: number): boolean {
    return this.col == col;
  }

  private _isSameRow(row: number): boolean {
    return this.row == row;
  }
}

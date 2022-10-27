import Position from "./Position";
import Tile from "./Tile";

export default class Board {
  private _currentScore: number;
  private _selectedTile!: Tile | null;
  private _tiles: Array<Array<Tile>>;

  constructor(private readonly _size: number) {
    this._currentScore = 0;
    this._tiles = new Array<Array<Tile>>();

    this._populateTiles();
  }

  public get currentScore(): number {
    return this._currentScore;
  }

  public get tiles(): Array<Array<Tile>> {
    return this._tiles;
  }

  public get size(): number {
    return this._size;
  }

  public set selectedTile(tile: Tile) {
    this._selectedTile = tile;
  }

  public get selectedTile(): Tile {
    return this._selectedTile!;
  }

  public getTileAtPosition(col: number, row: number): Tile {
    return this._tiles[row][col];
  }

  public isValidMove(currentTile: Tile, newTilePosition: Tile): boolean {
    return currentTile.position.isNeighborTile(newTilePosition.position);
  }

  public swapSelectedTileWith(tileToSwap: Tile) {
    const selectedTilePosition = new Position(
      this._selectedTile!.position.col,
      this._selectedTile!.position.row
    );
    const swapTilePosition = new Position(
      tileToSwap.position.col,
      tileToSwap.position.row
    );

    const updatedSelectedTile = new Tile(
      swapTilePosition,
      this.selectedTile.color
    );
    const updatedTileToSwap = new Tile(selectedTilePosition, tileToSwap.color);

    this._tiles[selectedTilePosition.row][selectedTilePosition.col] =
      updatedTileToSwap;

    this._tiles[swapTilePosition.row][swapTilePosition.col] =
      updatedSelectedTile;
  }

  private _populateTiles() {
    for (let row = 0; row < this._size; row++) {
      this._tiles[row] = new Array();

      for (let col = 0; col < this._size; col++) {
        this._tiles[row][col] = new Tile(new Position(col, row));
      }
    }
  }
}

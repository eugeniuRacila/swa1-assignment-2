import Board from "../types/Board";
import Tile from "../types/Tile";
import GameDomEvents from "./GameDomEvents";

export default class GameDom {
  private static readonly _boardDom = document.getElementById("game-grid");
  private static readonly _scoreDom =
    document.getElementById("game-current-score");

  private _domTiles: Array<HTMLDivElement>;

  constructor(private readonly _board: Board) {
    this._domTiles = Array<HTMLDivElement>();

    this._populateDomBoard();
    GameDomEvents.mountEventsOnDomTiles(this._board, this._domTiles);
  }

  private _populateDomBoard() {
    let newDomTile: HTMLDivElement;
    for (let row = 0; row < this._board.size; row++) {
      for (let col = 0; col < this._board.size; col++) {
        newDomTile = this._getNewDomTile(
          this._board.getTileAtPosition(col, row)
        );

        this._domTiles.push(newDomTile);
        GameDom._boardDom?.appendChild(newDomTile);
      }
    }
  }

  private _getNewDomTile(tile: Tile): HTMLDivElement {
    const domTile = document.createElement("div");

    domTile.id = `game-tile-${tile.position.col}-${tile.position.row}`;
    domTile.classList.add("game-grid__cell");
    domTile.style.backgroundColor = tile.color.colorHex;
    domTile.title = `Column: ${tile.position.col + 1}, Row: ${
      tile.position.row + 1
    }`;

    domTile.setAttribute("draggable", "true");

    domTile.dataset.col = domTile.dataset.col = String(tile.position.col);
    domTile.dataset.row = String(tile.position.row);

    return domTile;
  }
}

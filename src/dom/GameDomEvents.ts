import Board from "../types/Board";
import Tile from "../types/Tile";

export default class GameDomEvents {
  static mountEventsOnDomTiles(board: Board, domTiles: Array<HTMLDivElement>) {
    for (let i = 0; i < domTiles.length; i++) {
      GameDomEvents._mountDragEvents(board, domTiles[i]);
    }
  }

  private static _mountDragEvents(board: Board, domTile: HTMLDivElement) {
    domTile.addEventListener("dragenter", GameDomEvents._dragEnter);
    domTile.addEventListener("dragover", GameDomEvents._dragOver);

    domTile.addEventListener("dragstart", (event: DragEvent) => {
      GameDomEvents._dragStartEvent(event, board);
    });

    domTile.addEventListener("drop", (event: DragEvent) => {
      GameDomEvents._dragDrop(event, board);
    });
  }

  private static _dragDrop(event: DragEvent, board: Board) {
    const domTileToReplace = event?.target as HTMLDivElement;
    const tileToReplace = board.getTileAtPosition(
      +domTileToReplace.dataset.col!,
      +domTileToReplace.dataset.row!
    );

    if (board.isValidMove(board.selectedTile, tileToReplace)) {
      GameDomEvents._swapDomTiles(board.selectedTile, tileToReplace);
      board.swapSelectedTileWith(tileToReplace);
      GameDomEvents._checkRowMatches(board);
      GameDomEvents._checkColMatches(board);
    }
  }

  private static _dragEnter(event: DragEvent) {
    event.preventDefault();
  }

  private static _dragOver(event: DragEvent) {
    event.preventDefault();
  }

  private static _dragStartEvent(event: DragEvent, board: Board) {
    const domTile = event?.target as HTMLDivElement;

    board.selectedTile = board.getTileAtPosition(
      +domTile.dataset.col!,
      +domTile.dataset.row!
    );
  }

  private static _checkRowMatches(board: Board) {
    let currentColor = "";
    let matchCounter = 1;
    let whileCounter = 0;

    for (let row = 0; row < board.size; row++) {
      for (let tileIndex = 0; tileIndex < board.size - 2; tileIndex++) {
        currentColor = board.tiles[row][tileIndex].color.colorHex;
        whileCounter = tileIndex + 1;

        while (
          whileCounter < board.size &&
          currentColor == board.tiles[row][whileCounter].color.colorHex
        ) {
          matchCounter++;
          whileCounter++;
        }

        if (matchCounter > 2) {
          console.log(
            `Match found on row: ${row}, starting at index: ${tileIndex} and consists of ${matchCounter} matches.`
          );

          tileIndex = whileCounter;
        }

        matchCounter = 1;
        whileCounter = 0;
      }
    }
  }

  private static _checkColMatches(board: Board) {
    let currentColor = "";
    let matchCounter = 1;
    let whileCounter = 0;

    for (let col = 0; col < board.size; col++) {
      for (let tileIndex = 0; tileIndex < board.size - 2; tileIndex++) {
        currentColor = board.tiles[tileIndex][col].color.colorHex;
        whileCounter = tileIndex + 1;

        while (
          whileCounter < board.size &&
          currentColor == board.tiles[whileCounter][col].color.colorHex
        ) {
          matchCounter++;
          whileCounter++;
        }

        if (matchCounter > 2) {
          console.log(
            `Match found on col: ${col}, starting at index: ${tileIndex} and consists of ${matchCounter} matches.`
          );

          tileIndex = whileCounter;
        }

        matchCounter = 1;
        whileCounter = 0;
      }
    }
  }

  private static _swapDomTiles(selectedTile: Tile, swapWithTile: Tile) {
    const selectedTileDom = document.getElementById(
      `game-tile-${selectedTile.position.col}-${selectedTile.position.row}`
    );
    const swapWithTileDom = document.getElementById(
      `game-tile-${swapWithTile.position.col}-${swapWithTile.position.row}`
    );

    if (selectedTileDom)
      selectedTileDom!.style.backgroundColor = swapWithTile.color.colorHex;

    if (swapWithTileDom)
      swapWithTileDom.style.backgroundColor = selectedTile.color.colorHex;
  }
}

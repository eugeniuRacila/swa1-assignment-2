import "./style.css";

let score = 0;

const boardDom = document.getElementById("game-grid");

const candyColors = ["red", "yellow", "orange", "purple", "green", "blue"];

const boardSize = 8;
const cells: HTMLDivElement[] = [];

let cellColorBeingDragged: string;
let cellIdBeingDragged: number;
let cellColorBeingReplaced: string;
let cellIdBeingReplaced: number;

const getNewBoardCell = () => {
  const boardCell = document.createElement("div");
  boardCell.classList.add("game-grid__cell");

  return boardCell;
};

const getRandomColor = () => {
  return candyColors[Math.floor(Math.random() * candyColors.length)];
};

const createBoard = () => {
  for (let i = 0; i < boardSize ** 2; i++) {
    const boardCell = getNewBoardCell();

    boardCell.setAttribute("draggable", "true");
    boardCell.setAttribute("id", i.toString());

    boardDom?.appendChild(boardCell);
    boardCell.style.backgroundColor = getRandomColor();

    cells.push(boardCell);
  }
};

const mountEvents = () => {
  cells.map((cell) => cell.addEventListener("dragstart", dragStart));
  cells.map((cell) => cell.addEventListener("dragend", dragEnd));
  cells.map((cell) => cell.addEventListener("dragover", dragOver));
  cells.map((cell) => cell.addEventListener("dragenter", dragEnter));
  cells.map((cell) => cell.addEventListener("dragleave", dragLeave));
  cells.map((cell) => cell.addEventListener("drop", dragDrop));
};

const dragStart = (event: DragEvent) => {
  // console.log("dragstart");

  const element = event?.target as HTMLDivElement;
  cellColorBeingDragged = element.style.backgroundColor;
  cellIdBeingDragged = parseInt(element.id);
};

const dragEnd = () => {
  // console.log("dragend");
};

const dragOver = (event: DragEvent) => {
  // console.log("dragover");

  event.preventDefault();
};

const dragEnter = (event: DragEvent) => {
  // console.log("dragenter");

  event.preventDefault();
};

const dragLeave = () => {
  // console.log("dragleave");
};

const dragDrop = (event: DragEvent) => {
  // console.log("drop");

  const element = event?.target as HTMLDivElement;

  const validMoves = [
    cellIdBeingDragged - 1,
    cellIdBeingDragged - boardSize,
    cellIdBeingDragged + 1,
    cellIdBeingDragged + boardSize,
  ];

  const isValidMove = validMoves.includes(parseInt(element.id));

  if (isValidMove) {
    cellColorBeingReplaced = element.style.backgroundColor;
    cellIdBeingReplaced = parseInt(element.id);

    element.style.backgroundColor = cellColorBeingDragged;
    cells[cellIdBeingDragged].style.backgroundColor = cellColorBeingReplaced;

    checkRowForMatchForThree();
    checkColumnForMatchForThree();
    refillEmptyCells();
  }
};

const checkRowForMatchForThree = () => {
  let rowOfThree: number[];
  let decidedColor: string;
  let isBlank: boolean;

  for (let i = 0; i < boardSize ** 2 - 3; i++) {
    if (boardSize - 2 <= i % 8) continue;

    rowOfThree = [i, i + 1, i + 2];
    decidedColor = cells[i].style.backgroundColor;
    isBlank = cells[i].style.backgroundColor.length === 0;

    if (
      rowOfThree.every(
        (index) =>
          cells[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      score += 3;
      rowOfThree.map((index) => {
        cells[index].style.backgroundColor = "";
      });
    }
  }
};

const checkColumnForMatchForThree = () => {
  let columnOfThree: number[];
  let decidedColor: string;
  let isBlank: boolean;

  for (let i = 0; i < 47; i++) {
    columnOfThree = [i, i + boardSize, i + boardSize * 2];
    decidedColor = cells[i].style.backgroundColor;
    isBlank = cells[i].style.backgroundColor.length === 0;

    if (
      columnOfThree.every(
        (index) =>
          cells[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      score += 3;
      columnOfThree.map((index) => {
        cells[index].style.backgroundColor = "";
      });
    }
  }
};

const refillEmptyCells = () => {
  console.log("refilling");

  for (let i = 0; i < boardSize ** 2 - boardSize; i++) {
    if (cells[i + boardSize].style.backgroundColor.length === 0) {
      cells[i + boardSize].style.backgroundColor =
        cells[i].style.backgroundColor;
      cells[i].style.backgroundColor = "";

      // Generate new cells for empty cell on the first row
      for (let i = 0; i < boardSize; i++) {
        if (cells[i].style.backgroundColor.length === 0) {
          cells[i].style.backgroundColor = getRandomColor();
        }
      }
    }
  }
};

window.setInterval(refillEmptyCells, 100);

createBoard();
mountEvents();
checkRowForMatchForThree();
checkColumnForMatchForThree();
// refillEmptyCells();

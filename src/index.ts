import GameDom from "./dom/GameDOM";
import "./style.css";
import Board from "./types/Board";

const board = new Board(8);
const game = new GameDom(board);

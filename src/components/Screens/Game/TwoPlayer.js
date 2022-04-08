import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
import Button from "@mui/material/Button";
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

import "./Game.style.css";
import Square from "./Square";
import Pause from "./Pause";

import Traybtn from "../../reuseable/Traybtn";
import { WindowEVent } from "../../utility/windowFunctions";

const { dialog } = window.require("electron");
const path = window.require("path");

const { BrowserWindow, app } = window.require("@electron/remote");

const winningOdds = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const initialValue = Array(9).fill(null);

let NumberPlays = 0;
let Draw = 0;
let P1_Score = 0;
let P2_Score = 0;

let P1_CurrentScore = 0;
let P2_CurrentScore = 0;

function TwoPlayer() {
	const PlayerOne = "X";
	const PlayerTwo = "O";

	const [Path, setPath] = useState(app.getAppPath());

	const [GameSqure, setGameSqure] = useState(initialValue);
	const [isXplay, setisXplay] = useState(true);
	const [PlayerTurn, setPlayerTurn] = useState(`Player One`);

	const [Winner, setWinner] = useState(`Play`);
	const [player1_Score, setplayer1_Score] = useState(0);
	const [player2_Score, setplayer2_Score] = useState(0);
	const [P1_gameWon, setP1_gameWon] = useState(0);
	const [P2_gameWon, setP2_gameWon] = useState(0);
	const [TotalGamePlayed, setTotalGamePlayed] = useState(0);
	const [NoDraw, setNoDraw] = useState(0);


  const [IsPaused, setIsPaused] = useState(false)

	function playSound(type) {
		if (type === "played") {
			const playSound = new Audio(
				`${path.join(Path, "/build/assets/sounds/playS.wav")}`
			);
			playSound.volume = 0.1;
			playSound.play();
		} else if (type === "win") {
			const playSound = new Audio(
				`${path.join(Path, "/build/assets/sounds/win.wav")}`
			);
			playSound.volume = 0.1;
			playSound.play();
		} else if (type === "draw") {
			const playSound = new Audio(
				`${path.join(Path, "/build/assets/sounds/draw.wav")}`
			);
			playSound.volume = 0.1;
			playSound.play();
		}
	}

	function PlayedGame(i) {
		const isPlayerTurn =
			GameSqure.filter((square) => square !== null).length % 2 === 0;

		const TempGame = [...GameSqure];

		if (GameSqure[i] !== null) return;
		TempGame[i] = isXplay ? "X" : "O";

		playSound("played");
		isXplay
			? setPlayerTurn(`Player Two's turn`)
			: setPlayerTurn(`Player One's turn`);
		setGameSqure(TempGame);
		setisXplay(!isXplay);
	}

	function showDialogue() {
		dialog.showOpenDialog();
	}

	function reStartGame() {
		setGameSqure(initialValue);
		setisXplay(true);
    // NumberPlays = 0;
    // Draw = 0;
    // P1_Score = 0;
    // P2_Score = 0;

    // P1_CurrentScore = 0;
    // P2_CurrentScore = 0;
	}

	function checkWinner() {
		for (let index = 0; index < winningOdds.length; index++) {
			const [a, b, c] = winningOdds[index];
			if (
				GameSqure[a] &&
				GameSqure[a] === GameSqure[b] &&
				GameSqure[a] === GameSqure[c]
			) {
				return GameSqure[a];
			}
		}

		return null;
	}

	useEffect(() => {
		const winner = checkWinner();

		if (winner) {
			setPlayerTurn(`${winner} won the game`);
			playSound("win");
			const notification = {
				title: "Xando",
				body: `${winner} won the game`,
				icon: `${path.join(Path, "build/assets/icons/icon.png")}`,
			};

			if (winner === PlayerOne) {
				P1_Score = P1_Score + 1;
				setP1_gameWon(P1_Score);
				P1_CurrentScore = Math.floor(P1_Score * 2);
				setplayer1_Score(P1_CurrentScore);
			}

			if (winner === PlayerTwo) {
				P2_Score = P2_Score + 1;
				setP2_gameWon(P2_Score);
				P2_CurrentScore = Math.floor(P2_Score * 2);
				setplayer2_Score(P2_CurrentScore);
			}

			NumberPlays = NumberPlays + 1;
			setTotalGamePlayed(NumberPlays);

			const notifyMe = new window.Notification(
				notification.title,
				notification
			);

			reStartGame();

			return;
		}

		//if draw this portion of code runs
		if (!GameSqure.includes(null)) {
			setPlayerTurn(`Its a draw game`);
			playSound("draw");
			Draw = Draw + 1;
			setNoDraw(Draw);

			NumberPlays = NumberPlays + 1;
			setTotalGamePlayed(NumberPlays);
			reStartGame();
		}
	}, [GameSqure]);

	useEffect(() => {
		return () => {
			NumberPlays = 0;
			Draw = 0;
			P1_Score = 0;
			P2_Score = 0;

			P1_CurrentScore = 0;
			P2_CurrentScore = 0;
		};
	}, []);

	return (

    <>
    {IsPaused && <Pause  setIsPaused={setIsPaused}/>}
		<div className='gameContainer'>
			<p className='playerConsole'>{PlayerTurn}</p>

			<Traybtn />

			<motion.div
				animate={{
					scale: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],

					rotate: [0, 360],
				}}
				transition={{
					duration: 2,
				}}
				className='gameBoard'
			>
				<div className='jc-center row'>
					<Square
						className='b-b-r'
						state={GameSqure[0]}
						onClick={() => PlayedGame(0)}
					/>
					<Square
						className='b-b-r'
						state={GameSqure[1]}
						onClick={() => PlayedGame(1)}
					/>
					<Square
						className='b-b'
						state={GameSqure[2]}
						onClick={() => PlayedGame(2)}
					/>
				</div>
				<div className='jc-center row'>
					<Square
						className='b-b-r'
						state={GameSqure[3]}
						onClick={() => PlayedGame(3)}
					/>
					<Square
						className='b-b-r'
						state={GameSqure[4]}
						onClick={() => PlayedGame(4)}
					/>
					<Square
						className='b-b'
						state={GameSqure[5]}
						onClick={() => PlayedGame(5)}
					/>
				</div>
				<div className='jc-center row'>
					<Square
						className='b-r'
						state={GameSqure[6]}
						onClick={() => PlayedGame(6)}
					/>
					<Square
						className='b-r'
						state={GameSqure[7]}
						onClick={() => PlayedGame(7)}
					/>
					<Square state={GameSqure[8]} onClick={() => PlayedGame(8)} />
				</div>
			</motion.div>

			<div className='notifyPlayer'>
				<h4 className='playerName'>Player 1</h4>
				<div className={isXplay ? "bulb-on" : "bulb-off"}></div>
				<p className='playerScore'>Score: {player1_Score}pts</p>
				<p className='playerScore'>Won: {P1_gameWon} game(s)</p>
			</div>
			<div className='notifyComp'>
				<h4 className='playerName'>Player 2</h4>
				<div className={!isXplay ? "bulb-on" : "bulb-off"}></div>
				<p className='playerScore'>Score: {player2_Score}pts</p>
				<p className='playerScore'>Won: {P2_gameWon} game(s)</p>
			</div>

			<div className='gameDashBord'>
				<p>Game Played: {TotalGamePlayed}</p>
				<p>Drawed: {NoDraw}</p>
			</div>

			<div className='gameCtrls'>
				<Stack direction='row' spacing={4}>
					<Tooltip title='Back to menu'>
						<Button
							component={Link}
							to='/'
							variant='outlined'
							startIcon={<ArrowBackIcon />}
							className='gameBtn'
						>
							menu
						</Button>
					</Tooltip>
					<Tooltip title='Restart game'>
						<Button
							onClick={reStartGame}
							variant='outlined'
							startIcon={<ReplayIcon />}
							className='gameBtn'
						>
							Resart
						</Button>
					</Tooltip>
					<Tooltip title='Pause'>
						<Button
							onClick={()=>setIsPaused(true)}
							variant='outlined'
							endIcon={<VideogameAssetOffIcon />}
							className='gameBtn'
						>
							Pause
						</Button>
					</Tooltip>
				</Stack>
			</div>
		</div>

    </>
	);
}

export default TwoPlayer;

import React, { useState, useEffect } from "react";

import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
import Button from "@mui/material/Button";
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

import { saveData } from "../../utility/useDB";

import "./Game.style.css";
import Square from "./Square";

import Traybtn from "../../reuseable/Traybtn";
import Pause from "./Pause";

// const { dialog } = window.require("electron");
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

const initialValue = () => new Array(9).fill(null);

let NumberPlays = 0;
let Draw = 0;
let P_Score = 0;
let C_Score = 0;

let P_CurrentScore = 0;
let C_CurrentScore = 0;

function OnePlayer() {
	const Computer = "O";
	const PlayerOne = "X";

	const [Path, setPath] = useState(app.getAppPath());

	const [GameSqure, setGameSqure] = useState(initialValue());
	const [isXplay, setisXplay] = useState(true);
	const [Winner, setWinner] = useState(`Play`);
	const [playerScore, setplayerScore] = useState(0);
	const [ComputerScore, setComputerScore] = useState(0);
	const [P_gameWon, setP_gameWon] = useState(0);
	const [C_gameWon, setC_gameWon] = useState(0);
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

	function ComputerPlay() {
		const linesThatAre = (a, b, c) => {
			return winningOdds.filter((squareIndexes) => {
				const squareValues = squareIndexes.map((index) => GameSqure[index]);
				return (
					JSON.stringify([a, b, c].sort()) ===
					JSON.stringify(squareValues.sort())
				);
			});
		};

		const isComputerTurn =
			GameSqure.filter((square) => square !== null).length % 2 === 1;

		const playerWon = linesThatAre("X", "X", "X").length > 0;
		const computerWon = linesThatAre("O", "O", "O").length > 0;

		if (playerWon) {
			declareWinner(PlayerOne);
			return;
		}

		if (computerWon) {
			declareWinner(Computer);
			return;
		}

		if (!GameSqure.includes(null)) {
			setWinner(`Its a draw game`);
			Draw = Draw + 1;
			NumberPlays = NumberPlays + 1;
			setNoDraw(Draw);
			setTotalGamePlayed(NumberPlays);
			playSound("draw");

			reStartGame();

			return;
		}

		if (isComputerTurn) {
			const winingLines = linesThatAre("O", "O", null);
			if (winingLines.length > 0) {
				const winIndex = winingLines[0].filter(
					(index) => GameSqure[index] === null
				)[0];
				PlaceComputerAt(winIndex);
				return;
			}

			const linesToBlock = linesThatAre("X", "X", null);

			if (linesToBlock.length > 0) {
				const blockIndex = linesToBlock[0].filter(
					(index) => GameSqure[index] === null
				)[0];
				PlaceComputerAt(blockIndex);
				return;
			}

			const linesToContinue = linesThatAre("O", null, null);

			if (linesToContinue.length > 0) {
				PlaceComputerAt(
					linesToContinue[0].filter((index) => GameSqure[index] === null)[0]
				);
				return;
			}

			const emptyIndexes = GameSqure.map((square, index) =>
				square === null ? index : null
			).filter((val) => val !== null);

			const randomIndex =
				emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];

			PlaceComputerAt(randomIndex);
		}
	}

	function PlaceComputerAt(index) {
		setTimeout(() => {
			let TempGame = GameSqure;
			TempGame[index] = Computer;
			setGameSqure([...TempGame]);
			playSound("played");
			setisXplay(true);
		}, 1000);
	}

	function PlayedOne(i) {
		const isPlayerTurn =
			GameSqure.filter((square) => square !== null).length % 2 === 0;

		if (GameSqure[i] !== null) return;

		if (isPlayerTurn) {
			const TempGame = GameSqure;
			TempGame[i] = PlayerOne;

			playSound("played");
			setGameSqure([...TempGame]);
			setisXplay(false);
		}
	}

	function reStartGame() {
		setGameSqure(initialValue());
		setTimeout(() => setWinner("Play"), 1500);
		setisXplay(true);
		// NumberPlays = 0;
		// 	Draw = 0;
		// 	P_Score = 0;
		// 	C_Score = 0;

		// 	P_CurrentScore = 0;
		// 	C_CurrentScore = 0;
	}

	function declareWinner(winningPlayer) {
		if (winningPlayer) {
			setWinner(`${winningPlayer} won the game`);
			playSound("win");

			NumberPlays = NumberPlays + 1;

			if (winningPlayer === "X") {
				P_Score = P_Score + 1;
				setP_gameWon(P_Score);
				P_CurrentScore = Math.floor(P_Score * 2);
			}
			if (winningPlayer === "O") {
				C_Score = C_Score + 1;
				setC_gameWon(C_Score);
				C_CurrentScore = Math.floor(C_Score * 2);
			}

			const notification = {
				title: "Xando",
				body: `${winningPlayer} won the game`,
				icon: `${path.join(Path, "build/assets/icons/icon.png")}`,
			};

			const notifyMe = new window.Notification(
				notification.title,
				notification
			);

			setplayerScore(P_CurrentScore);

			setComputerScore(C_CurrentScore);

			setTotalGamePlayed(NumberPlays);

			reStartGame();
		}
	}

	useEffect(() => {
		ComputerPlay();
	}, [GameSqure]);

	useEffect(() => {
		return () => {
			saveData("game.highScore", { P_CurrentScore, Date: new Date() });
			NumberPlays = 0;
			Draw = 0;
			P_Score = 0;
			C_Score = 0;

			P_CurrentScore = 0;
			C_CurrentScore = 0;
		};
	}, []);

	return (

		<>
{IsPaused && <Pause  setIsPaused={setIsPaused}/>}
		<div className='gameContainer'>
			<p className='playerConsole'>{Winner}</p>

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
						onClick={() => PlayedOne(0)}
					/>
					<Square
						className='b-b-r'
						state={GameSqure[1]}
						onClick={() => PlayedOne(1)}
					/>
					<Square
						className='b-b'
						state={GameSqure[2]}
						onClick={() => PlayedOne(2)}
					/>
				</div>
				<div className='jc-center row'>
					<Square
						className='b-b-r'
						state={GameSqure[3]}
						onClick={() => PlayedOne(3)}
					/>
					<Square
						className='b-b-r'
						state={GameSqure[4]}
						onClick={() => PlayedOne(4)}
					/>
					<Square
						className='b-b'
						state={GameSqure[5]}
						onClick={() => PlayedOne(5)}
					/>
				</div>
				<div className='jc-center row'>
					<Square
						className='b-r'
						state={GameSqure[6]}
						onClick={() => PlayedOne(6)}
					/>
					<Square
						className='b-r'
						state={GameSqure[7]}
						onClick={() => PlayedOne(7)}
					/>
					<Square state={GameSqure[8]} onClick={() => PlayedOne(8)} />
				</div>
			</motion.div>

			<div className='notifyPlayer'>
				<h4 className='playerName'>Player</h4>
				<div className={isXplay ? "bulb-on" : "bulb-off"}></div>
				<p className='playerScore'>Score: {playerScore}pts</p>
				<p className='playerScore'>Won: {P_gameWon} game(s)</p>
			</div>
			<div className='notifyComp'>
				<h4 className='playerName'>Computer</h4>
				<div className={!isXplay ? "bulb-on" : "bulb-off"}></div>
				<p className='playerScore'>Score: {ComputerScore}pts</p>
				<p className='playerScore'>Won: {C_gameWon} game(s)</p>
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
							onClick={() => reStartGame()}
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

export default OnePlayer;

import "./Home.style.css";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Zoom from "@mui/material/Zoom";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import SettingsIcon from "@mui/icons-material/Settings";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

import { motion } from "framer-motion";

import Traybtn from "../../reuseable/Traybtn";

const path = window.require("path");

const { BrowserWindow, app } = window.require("@electron/remote");

const ArrowAnimation = {
	y: {
		duration: 0.9,
		yoyo: Infinity,
		ease: "easeIn",
	},
};

let GameSoundTimer;

function Home() {
	const [Path, setPath] = useState(app.getAppPath());

	function playSound() {
		const gameSound = new Audio(
			`${path.join(Path, "/build/assets/sounds/bg.mp3")}`
		);
		gameSound.volume = 0.1;
		gameSound.loop = true;
		gameSound.play();
	}

	function playCursorSOund() {
		const btnSound = new Audio(
			`${path.join(Path, "/build/assets/sounds/gmsound.wav")}`
		);
		btnSound.volume = 0.1;
		btnSound.play();
	}

	useEffect(() => {
		return () => {};
	}, []);

	return (
		<>
			<video
				src={`${path.join(Path, "/build/assets/videos/gameBg.mp4")}`}
				autoPlay
				loop
				muted
			/>

			<div className='container'>
				<Traybtn />

				<motion.h3
					animate={{ y: 20, opacity: 0.9 }}
					transition={ArrowAnimation}
					className='game-title'
				>
					<span style={{ color: "#1cdbf5" }}>X</span>
					and
					<span style={{ color: "#F0A500" }}>O</span>
				</motion.h3>

				<div className='content-container'>
					<Stack direction='column' spacing={4}>
						<Tooltip
							title='Player Vs Computer'
							placement='top-end'
							arrow
							TransitionComponent={Zoom}
						>
							<Button
								onMouseEnter={playCursorSOund}
								variant='outlined'
								component={Link}
								to='/1player'
								endIcon={<VideogameAssetIcon />}
								className='MenuBtn'
							>
								Single Player
							</Button>
						</Tooltip>



						<Tooltip
							title='2 Player'
							placement='right-end'
							arrow
							TransitionComponent={Zoom}
						>
							<Button
								onMouseEnter={playCursorSOund}
								variant='outlined'
								component={Link}
								to='/2player'
								endIcon={<SportsEsportsIcon />}
								className='MenuBtn'
							>
								2 player
							</Button>
						</Tooltip>


						<Tooltip
							title='Check previous highScore'
							placement='right-end'
							arrow
							TransitionComponent={Zoom}
						>
							<Button
								onMouseEnter={playCursorSOund}
								variant='outlined'
								component={Link}
								to='/score'
								endIcon={<SportsScoreIcon />}
								className='MenuBtn'
							>
								high score
							</Button>
						</Tooltip>




						<Tooltip
							title='change settings'
							placement='bottom-end'
							arrow
							TransitionComponent={Zoom}
						>
					
							<Button
								onMouseEnter={playCursorSOund}
								variant='outlined'
								component={Link}
								to='/settings'
								endIcon={<SettingsIcon />}
								className='MenuBtn'
							>
								settings
							</Button>
						</Tooltip>



					</Stack>

					<p className='deveSignature'>
						Made with <span style={{ color: "#F0A500" }}>&hearts;</span> by
						Tdammy{" "}
					</p>
				</div>
			</div>
		</>
	);
}

export default Home;

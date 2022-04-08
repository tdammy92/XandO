import React, { useEffect, useState } from "react";
import "./Score.style.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import CloseIcon from "@mui/icons-material/Close";

import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useNavigate } from "react-router-dom";

import { getData,clearScore } from "../../utility/useDB";

import Traybtn from "../../reuseable/Traybtn";

function Score() {
	const [Score, setScore] = useState([]);

	let navigate = useNavigate();


	function clearHighScore() {
		clearScore("game.highScore");
		navigate('/')
	}

	useEffect(() => {
		setScore(getData("game.highScore"));

		return () => {};
	}, []);

	// console.log(Score);

	return (
		<div className='mainContainer'>
			<p className='pageTitle'>Score Board</p>

			<Tooltip title='Back'>
				<ArrowBackIcon className='backBtn' onClick={() => navigate("/")} />
			</Tooltip>

			<Traybtn />

			{Score.length > 0 ? (
				<div className='container'>
					<TableContainer component={Paper} sx={{ maxWidth: 450 ,bgcolor:'#303a53',mt:2}} >
						<Table sx={{ minWidth: 250 }} size="small" aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell align='center'  sx={{ color: 'white', fontSize:24, fontWeight: 'medium' }}>Score</TableCell>
									<TableCell align='center'  sx={{ color: 'white', fontSize:24, fontWeight: 'medium' }}>Date</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Score.map((item, id) => (
									<TableRow key={id}>
										<TableCell align='center'  sx={{ color: 'white', fontSize:16, fontWeight: 'medium',p:1 }}>{item.P_CurrentScore}pts</TableCell>
										<TableCell align='center' sx={{ color: 'white', fontSize:16, fontWeight: 'medium',p:1 }}>
											{new Date(item.Date).toLocaleString()}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					
				</div>
			) :( <h3  style={{color:'white'}}>your score board is empty</h3>)}

			
			{Score.length > 0 ? (
			<Tooltip title='Clear Score'>
						<Button
							onClick={clearHighScore}
							variant='outlined'
							endIcon={<ChangeCircleIcon />}
							className='clearBtn'
						>
							Clear Score
						</Button>
					</Tooltip>) : null}

		</div>
	);
}

export default Score;

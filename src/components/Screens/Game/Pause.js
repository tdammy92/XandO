import React from "react";
import "./Game.style.css";
import { Link } from "react-router-dom";

import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

function Pause({setIsPaused}) {
	return (
		<div className='Pause_Screen'>

        <div className="Pause_Wrapper">
			<Stack direction='column' spacing={10}>
				<Tooltip title='Play'>
					<Button
						onClick={()=>setIsPaused(false)}
						variant='outlined'
						startIcon={<VideogameAssetIcon />}
						className='gameBtn'
					>
						Play
					</Button>
				</Tooltip>
				<Tooltip title='Quit Game'>
					<Button
						component={Link}
                        to='/'
						variant='outlined'
						startIcon={<ArrowBackIcon />}
						className='gameBtn'
					>
						Quit
					</Button>
				</Tooltip>
			</Stack>

        </div>
		</div>
	);
}

export default Pause;

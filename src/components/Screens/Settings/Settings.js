import React from "react";
import "./Settings.style.css";

import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { useNavigate } from "react-router-dom";

import Traybtn from "../../reuseable/Traybtn";

function Settings() {
	let navigate = useNavigate();

	return (
		<div className='mainContainer'>
			<p className='pageTitle'>Settings</p>

			<Tooltip title='Back'>
				<ArrowBackIcon className='backBtn' onClick={() => navigate("/")} />
			</Tooltip>

			<Traybtn />

			<div className='contentConatiner'>
				<h3 className='notify'>Still in development</h3>

				<IntegrationInstructionsIcon className='notifyIcon' fontSize="large" />
			</div>
		</div>
	);
}

export default Settings;

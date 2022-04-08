import React from "react";

import Home from "./components/Screens/Home/Home";
import OnePlayer from "./components/Screens/Game/OnePlayer";
import TwoPlayer from "./components/Screens/Game/TwoPlayer";
import Score from "./components/Screens/Score/Score";
import Settings from "./components/Screens/Settings/Settings";


import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='1player' element={<OnePlayer/>} />
				<Route path='2player' element={<TwoPlayer/>} />
				<Route path='score' element={<Score/>} />
				<Route path='settings' element={<Settings/>} />
			</Routes>
		</>
	);
}

export default App;

const Store = window.require("electron-store");

const store = new Store();

let scoreArray = [];

function saveData(name, value) {
	scoreArray = [value];

	try {
		const response = store.get(name);

		const HighSCoreChecker = checkHighScore(response, value.P_CurrentScore);

		

		if (HighSCoreChecker===true) {
			if (response) {
				scoreArray = [...scoreArray, ...response];

				if (scoreArray.length > 5) {
					console.log("greater than 5");
					scoreArray.pop();
					store.set(name, scoreArray);
				} else {
					console.log("less than 5");
					store.set(name, scoreArray);
				}
			} else {
				console.log("No save data");
				store.set(name, scoreArray);
			}
		}
	} catch (error) {
		console.log(error);
	}
}

function getData(name) {
	try {
		const result = store.get(name);

		if (result) {
			return result;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
	}
}


function clearScore(name){

	try {
		
		store.delete(name);
	} catch (error) {
		console.log(error)
	}
}

function checkHighScore(s_Array, value) {

	if (s_Array) {
		return s_Array
		.map((ite, ind) => ite)
		.every((ite) => ite?.P_CurrentScore < value);
	} else {
		return true
	}
	
}


export { saveData, getData,clearScore };


const { ipcRenderer } = window.require('electron');





export function WindowEVent(options) {
	switch (options) {
		case 'closeApp':
			ipcRenderer.send('closeApp');
			break;
		case 'minimize':
			ipcRenderer.send('minimize');
			break;
	
		default:
			break;
	}
}


// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow,ipcMain} = require('electron')

const path = require('path');
const IsDev = require('electron-is-dev')
const Store = require('electron-store');
require('@electron/remote/main').initialize();

Store.initRenderer()


let window


const createWindow = () => {
  // Create the browser window.
  window = new BrowserWindow({
    title:"XandO",
    width: 700,
    // width: 900,
    minWidth:630,
    height: 500,
    minHeight:500,
    fullscreen:false,
    resizable:false,
    frame:false,
    show:false,
    icon:__dirname+'/public/assets/icons/icon.png',
    
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
webSecurity:false,
    enableRemoteModule:true,
    nodeIntegration:true,
    contextIsolation:false,
    
    }
  })

  // and load the index.html of the app.


  // window.loadURL('http://localhost:3000');
  window.loadURL(
    IsDev?  'http://localhost:3000' : `file://${path.join(__dirname,'../build/index.html')}`);

  window.once('ready-to-show',window.show)

  // Open the DevTools.
  // window.webContents.openDevTools()

require("@electron/remote/main").enable(window.webContents);
 ipcMain.on('closeApp',()=>window.close())
 ipcMain.on('minimize',()=>window.minimize())
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



// createTray =()=>{
//   const icon = path.join(__dirname,'/assets/icons/o.png');
//   const nImage = nativeImage.createFromPath(icon);


//   tray = new Tray(nImage);
//   // tray.on('click',(e)=>tog)
// }

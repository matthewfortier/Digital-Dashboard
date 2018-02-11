import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';

var zerorpc = require("zerorpc");

var client = new zerorpc.Client();
client.connect("tcp://184.171.150.62:4242");

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
import * as url from 'url';

if (serve) {
  require('electron-reload')(__dirname, {
  });
}

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1920,
    height: 720
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, '/index.html'),
    slashes:  true
  }));

  // Open the DevTools.
  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  ipcMain.on("mainWindowLoaded", function(event, item) {
    var speed = 0;
    var rpmRotation = 1200;

    setInterval(function(){

      client.invoke("redis", "GET:mph", function(error, res, more) {
        if(error) {
            console.error(error);
        } else {
            //console.log("UPDATE:", res);
            try {
              win.webContents.send('speed', res);                                                
            } catch (error) {
                // Ignore this for now
            }
        }
    
        if(!more) {
            //console.log("Done.");
        }
      });

        try {
            win.webContents.send('speed', speed);                 
            win.webContents.send('rpm', rpmRotation);                                                
        } catch (error) {
            // Ignore this for now
        }
        if(speed++ >= 120)
            speed = 0;

        rpmRotation -= 10
        if(rpmRotation < 240)
            rpmRotation = 1200;
    }, 16.6666);

    /* client.invoke("redis", "SET:mph:25", function(error, res, more) {
        if(error) {
            console.error(error);
        } else {
            console.log("UPDATE:", res);
        }
    
        if(!more) {
            console.log("Done.");
        }
      }); */
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

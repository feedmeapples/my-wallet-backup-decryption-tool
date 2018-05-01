var { 
  app 
  , BrowserWindow
  , Menu 
}                 = require('electron')
  , env           = require('node-env-file');

var mainWindow = null
  , windowRatio = [650, 780]

loadEnv('.env');

var dev = process.env.ENV === 'dev';

if (dev) {
  windowRatio = [1200, 800]
}

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: windowRatio[0], height: windowRatio[1]});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  if (process.env.ENV === 'dev') mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  var template = [{
    label: "Application",
    submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "CmdOrCtrl+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" }
    ]}
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});

function loadEnv(file) {
  try { env(file) } catch (e) {};
}

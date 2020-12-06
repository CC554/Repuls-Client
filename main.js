const { app, shell, webContents } = require('electron')
const { BrowserWindow } = require('electron')
const { globalShortcut } = require('electron')
const { dialog } = require('electron')
const shortcut = require('electron-localshortcut')
const RPC = require('discord-rpc')

app.commandLine.appendSwitch('disable-frame-rate-limit')
app.commandLine.appendSwitch('disable-gpu-vsync')
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('disable-breakpad');
app.commandLine.appendSwitch('disable-component-update');
app.commandLine.appendSwitch('disable-print-preview');
app.commandLine.appendSwitch('disable-metrics');
app.commandLine.appendSwitch('disable-metrics-repo');
app.commandLine.appendSwitch('smooth-scrolling');
app.commandLine.appendSwitch('enable-javascript-harmony');
app.commandLine.appendSwitch('enable-future-v8-vm-features');
app.commandLine.appendSwitch('disable-hang-monitor');
app.commandLine.appendSwitch('no-referrers');
app.commandLine.appendSwitch('disable-2d-canvas-clip-aa');
app.commandLine.appendSwitch('disable-bundled-ppapi-flash');
app.commandLine.appendSwitch('disable-logging');
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('webrtc-max-cpu-consumption-percentage=100');
app.commandLine.appendSwitch('enable-pointer-lock-options');
app.commandLine.appendSwitch('disable-accelerated-video-decode', false);
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')
app.commandLine.appendSwitch('enable-quic');
app.commandLine.appendSwitch('high-dpi-support',1);

function init()
{
	DiscordRPC();
	createWindow();
	shortCuts();
	//Leave();
	//CheckGame();
}

function DiscordRPC()
{
	const rpc = new RPC.Client({ transport: "ipc" });
	rpc.on("ready", () => {
		rpc.setActivity({
			state: 'Playing Repuls.io',
			startTimestamp: new Date(),
			largeImageKey: 'repuls',
		})
	});

	console.log("Rich presence is now active")

	rpc.login({ clientId: "756818625213497404" })
}

//Erstellt das Fenster für Venge.io
function createWindow()
{
	win = new BrowserWindow({ width: 1920, height: 1080, icon: "files/game.png"})
	win.loadURL('https://repuls.io', {userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:70.0) Gecko/20100101 Firefox/70.0'})
	win.setFullScreen(true)
	win.removeMenu(true)
	win.setTitle("Repuls-Client")
	win.on('page-title-updated', function(e) { e.preventDefault() })
	console.log('Window has been created')
}

function Leave()
{
	win.webContents.on('will-prevent-unload', (event) => {
        const choice = dialog.showMessageBoxSync(win, {
            type: 'question',
            buttons: ['Leave', 'Stay'],
            title: 'Are you sure you want to leave?',
            message: '',
            defaultId: 0,
            cancelId: 1
        });
        const leave = (choice === 0)
        if (leave) {
            event.preventDefault();

        };
    })
}

function shortCuts()
{
	shortcut.register('F1', 'win', () => { 
		win.loadURL('https://repuls.io'), console.log('Loading assets') 
	})
	shortcut.register('Alt+F4', 'win', () => { 
		win.webContents.executeJavaScript(onbeforeunload = null),
		console.log('Quit has been used'),
		app.exit(0)  
	}) 
	shortcut.register('Ctrl+F5', 'win', () =>{
		win.webContents.session.clearStorageData()
		app.relaunch()
		app.exit()
	}) 
	shortcut.register('F9', 'win', () => { 
		win.webContents.openDevTools(), 
		console.log('DevTools opened') 
	})
    shortcut.register('F11', 'win', () => { 
		win.setSimpleFullScreen(!win.isSimpleFullScreen()) 
	})
	console.log('Shortcuts has been registered')
}	

app.on('ready', init)

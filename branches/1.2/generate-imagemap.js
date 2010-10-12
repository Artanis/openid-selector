var imagemagick = 'C:/Program Files/ImageMagick-6.6.4-Q16/';

var lang = 'en';
if (WScript.Arguments.length == 0) {
	// assuming english language
} else {
	lang = WScript.Arguments(0);
}

var fso = new ActiveXObject('Scripting.FileSystemObject');

var s;
var f = fso.OpenTextFile('js/openid-jquery-' + lang + '.js');
try {
	s = f.ReadAll();
} finally {
	f.Close();
}
var openid = {};
eval(s);

var cmd = imagemagick + 'montage';
var i = 0;
for (provider_id in providers_large) {
	cmd += ' images0/' + provider_id + '.ico.png';
	i++;
}
for (provider_id in providers_small) {
	cmd += ' images0/' + provider_id + '.ico.png';
	i++;
}
cmd += ' -tile ' + i + 'x1 -geometry 16x16+4+4 images/openid-small-' + lang + '.png';

var shell = new ActiveXObject('WScript.Shell');
var exec = shell.Exec(cmd);
while (exec.Status == 0) {
	WScript.Sleep(100);
}

WScript.Echo("done");
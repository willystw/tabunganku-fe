const rootDomain = process.env.TABUNGANKU_URL; // or your server IP for dev

const cspDirectives = {
	'base-uri': ["'self'"],
	'child-src': ["'self'"],
	'connect-src': ["'self'", 'ws://localhost:*', "http://172.20.10.5:8180", "http://192.168.18.199:8180"],
	'img-src': ["'self'", 'data:'],
	'font-src': ["'self'", 'data:'],
	'form-action': ["'self'"],
	'frame-ancestors': ["'self'"],
	'frame-src': [
		"'self'",
    "http://172.20.10.5:8180",
    "http://192.168.18.199:8180"
	],
	'manifest-src': ["'self'"],
	'media-src': ["'self'", 'data:'],
	'object-src': ["'none'"],
	'style-src': ["'self'", "'unsafe-inline'"],
	'default-src': [
		'self',
		...(rootDomain ? [rootDomain, `ws://${rootDomain}`] : []),
	],
	'script-src': [
		'self',
	],
	'worker-src': ["'self'"],
};

export default cspDirectives;

const cspDirectives = {
	'base-uri': ["'self'"],
	'child-src': ["'self'"],
	'connect-src': [
    'self', 
  ],
	'img-src': ["'self'", 'data:'],
	'font-src': ["'self'", 'data:'],
	'form-action': ["'self'"],
	'frame-ancestors': ["'self'"],
	'frame-src': [
		'self',
	],
	'manifest-src': ["'self'"],
	'media-src': ["'self'", 'data:'],
	'object-src': ["'none'"],
	'style-src': ["'self'", "'unsafe-inline'"],
	'default-src': [
		'self',
	],
	'script-src': [
		'self',
	],
	'worker-src': ["'self'"],
};

export default cspDirectives;

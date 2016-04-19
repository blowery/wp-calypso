/**
 * External dependencies
 */
import { assert } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import selectors from '../selectors';

const plugins = deepFreeze( {
	'start.site': [ {
		slug: 'vaultpress',
		name: 'VaultPress',
		key: 'vp-api-key',
		status: {
			start: false,
			install: null,
			activate: null,
			config: null,
			done: false,
		},
		error: null
	}, {
		slug: 'akismet',
		name: 'Akismet',
		key: 'ak-api-key',
		status: {
			start: false,
			install: null,
			activate: null,
			config: null,
			done: false,
		},
		error: null
	}, {
		slug: 'polldaddy',
		name: 'Polldaddy',
		key: 'pd-api-key',
		status: {
			start: false,
			install: null,
			activate: null,
			config: null,
			done: false,
		},
		error: null
	} ],
	'installing.site': [ {
		slug: 'vaultpress',
		name: 'VaultPress',
		key: 'vp-api-key',
		status: {
			start: false,
			install: false,
			activate: false,
			config: false,
			done: true,
		},
		error: null
	}, {
		slug: 'akismet',
		name: 'Akismet',
		key: 'ak-api-key',
		status: {
			start: true,
			install: true,
			activate: null,
			config: null,
			done: false,
		},
		error: null
	}, {
		slug: 'polldaddy',
		name: 'Polldaddy',
		key: 'pd-api-key',
		status: {
			start: false,
			install: null,
			activate: null,
			config: null,
			done: false,
		},
		error: null
	} ],
	'finished.site': [ {
		slug: 'vaultpress',
		name: 'VaultPress',
		key: 'vp-api-key',
		status: {
			start: false,
			install: false,
			activate: false,
			config: false,
			done: true,
		},
		error: null
	}, {
		slug: 'akismet',
		name: 'Akismet',
		key: 'ak-api-key',
		status: {
			start: false,
			install: false,
			activate: false,
			config: false,
			done: true,
		},
		error: null
	}, {
		slug: 'polldaddy',
		name: 'Polldaddy',
		key: 'pd-api-key',
		status: {
			start: false,
			install: false,
			activate: false,
			config: false,
			done: false,
		},
		error: { name: 'ErrorCode', message: 'Something went wrong.' }
	} ],
} );

const isRequesting = deepFreeze( {
	'finished.site': false,
	'wait.site': true,
} );

describe( 'Premium Plugin Selectors', function() {
	it( 'should contain isRequesting method', function() {
		assert.equal( typeof selectors.isRequesting, 'function' );
	} );

	it( 'should contain isFinished method', function() {
		assert.equal( typeof selectors.isFinished, 'function' );
	} );

	it( 'should contain getPluginsForSite method', function() {
		assert.equal( typeof selectors.getPluginsForSite, 'function' );
	} );

	it( 'should contain getActivePlugin method', function() {
		assert.equal( typeof selectors.getActivePlugin, 'function' );
	} );

	it( 'should contain getNextPlugin method', function() {
		assert.equal( typeof selectors.getNextPlugin, 'function' );
	} );

	describe( 'isRequesting', function() {
		it( 'Should get `true` if the requested site is not in the current state', function() {
			assert.equal( selectors.isRequesting( isRequesting, 'no.site' ), true );
		} );

		it( 'Should get `false` if the requested site is not being fetched', function() {
			assert.equal( selectors.isRequesting( isRequesting, 'finished.site' ), false );
		} );

		it( 'Should get `true` if the requested site is being fetched', function() {
			assert.equal( selectors.isRequesting( isRequesting, 'wait.site' ), true );
		} );
	} );

	describe( 'isFinished', function() {
		it( 'Should get `false` if the requested site is not in the current state', function() {
			assert.equal( selectors.isFinished( plugins, 'no.site' ), false );
		} );

		it( 'Should get `false` if there is a plugin installing on the requested site', function() {
			assert.equal( selectors.isFinished( plugins, 'installing.site' ), false );
		} );

		it( 'Should get `true` if all plugins on the requested site are either done or have errors', function() {
			assert.equal( selectors.isFinished( plugins, 'finished.site' ), true );
		} );
	} );

	describe( 'getPluginsForSite', function() {
		it( 'Should get `false` if the requested site is not in the current state', function() {
			assert.equal( selectors.getPluginsForSite( plugins, 'no.site' ), false );
		} );

		it( 'Should get the list of plugins if the site exists in the current state', function() {
			assert.equal( selectors.getPluginsForSite( plugins, 'start.site' ).length, 3 );
			assert.equal( selectors.getPluginsForSite( plugins, 'start.site' )[0].slug, 'vaultpress' );
			assert.equal( selectors.getPluginsForSite( plugins, 'start.site' )[1].slug, 'akismet' );
			assert.equal( selectors.getPluginsForSite( plugins, 'start.site' )[2].slug, 'polldaddy' );
		} );
	} );

	describe( 'getActivePlugin', function() {
		it( 'Should get `false` if the requested site is not in the current state', function() {
			assert.equal( selectors.getActivePlugin( plugins, 'no.site' ), false );
		} );

		it( 'Should get `false` if no plugins on the requested site are currently being installed', function() {
			assert.equal( selectors.getActivePlugin( plugins, 'start.site' ), false );
		} );

		it( 'Should get `false` if all plugins on the requested site are finished installing', function() {
			assert.equal( selectors.getActivePlugin( plugins, 'finished.site' ), false );
		} );

		it( 'Should get `akismet` if akismet is the currently being installed on the requested site', function() {
			assert.equal( selectors.getActivePlugin( plugins, 'installing.site' ).slug, 'akismet' );
		} );
	} );

	describe( 'getNextPlugin', function() {
		it( 'Should get `false` if the requested site is not in the current state', function() {
			assert.equal( selectors.getNextPlugin( plugins, 'no.site' ), false );
		} );

		it( 'Should get the first plugin in the list if the requested site hasn\'t started yet', function() {
			assert.equal( selectors.getNextPlugin( plugins, 'start.site' ).slug, 'vaultpress' );
		} );

		it( 'Should get `polldaddy`, next in the list, if the requested site is installing akismet', function() {
			assert.equal( selectors.getNextPlugin( plugins, 'installing.site' ).slug, 'polldaddy' );
		} );

		it( 'Should get `false`, if the requested site is finished installing all plugins', function() {
			assert.equal( selectors.getNextPlugin( plugins, 'finished.site' ), false );
		} );
	} );
} );
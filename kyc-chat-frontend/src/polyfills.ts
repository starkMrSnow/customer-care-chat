/***************************************************************************************************
 * BROWSER POLYFILLS
 */

// Required for some libraries (like sockjs-client) that expect 'global' to be defined.
// In a browser environment, 'window' is the global object.
(window as any).global = window;

// Standard Angular zone.js import (usually comes pre-configured)
import 'zone.js';
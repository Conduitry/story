# story
Minimal HTML5 history API wrapper

## About
The purpose of this library was to create a very thin wrapper around the HTML5 history API, but still one that handles the basic everyday tasks. It started as a bit of shared code that I found myself using on a couple of personal projects, so I decided to publish it here.

It handles programmatically switching to a URL or replacing a URL, informing your code when the URL changes, and intercepting clicks on hyperlinks to call the history API instead of performing page navigation.

## What it is not
It is not an actual router. You provide a function, this library calls your function when the URL changes. That's it.

## How to use
This is an ES2015 module. You will need some way to bundle and transpile this for your app.

## Methods available

### `setBase(base)`
Set a new value for the base path. Defaults to `"/"`. This should be the root path of your app.

### `watch(cb)`
Register a new callback to be informed whenever the path changes. Your callback will be called with one argument, the portion of the path after the currently specified base.

### `unwatch(cb)`
Unregisters a previously registered watcher.

### `to(url)`
Perform (virtual) navigation to the new URL. `url` will be appended to the current base.

Also calls any currently registered watchers.

### `replace(url)`
Replace the current URL with the new one you specify. `url` will be appended to the current base. Call this when you want to, for example, perform a redirect without creating a new entry in the navigation history.

Also calls any currently registered watchers.

## Hyperlink handling
Activating hyperlinks will be replaced with a call to `to()` provided that:
* the control/meta/shift keys were not pressed during the click, and the click was not done with the middle mouse button
* the hyperlink element has no `target` value
* the hyperlink's `href` begins with the currently selected base - defaults to `"/"` and can be changed with `setBase()`

If you have a hyperlink that would otherwise be caught by the click handler and you do not want it to be, you can specify `target="_self"` on the link element.

## License
This code was written by Conduitry and is released into the public domain.

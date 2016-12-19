let doc = document
let loc = doc.location
let watchers = []
let base

setBase('/')
doc.addEventListener('click', clickHandler)
addEventListener('popstate', informWatchers)

export function setBase(newBase) {
	base = loc.protocol + '//' + loc.host + newBase
}

export function watch(watcher) {
	watchers.push(watcher)
	informWatcher(watcher)
}

export function unwatch(watcher) {
	let idx = watchers.indexOf(watcher)
	if (idx > -1) {
		watchers.splice(idx, 1)
	}
}

export function to(url) {
	if (base + url !== loc.href) {
		history.pushState(null, '', base + url)
		informWatchers()
		scroll()
	}
}

export function replace(url) {
	if (base + url !== loc.href) {
		history.replaceState(null, '', base + url)
		informWatchers()
		scroll()
	}
}

function scroll() {
	doc.body.scrollTop = doc.documentElement.scrollTop = 0
}

function informWatcher(watcher) {
	let url = loc.href
	if (url.startsWith(base)) {
		setTimeout(watcher, 0, url.slice(base.length))
	}
}

function informWatchers() {
	watchers.forEach(informWatcher)
}

function clickHandler(event) {
	if (event.ctrlKey || event.metaKey || event.shiftKey || event.which === 2) {
		return
	}
	let elm = event.target
	while (elm.nodeName !== 'A') {
		elm = elm.parentElement
		if (!elm) {
			return
		}
	}
	if (elm.target) {
		return
	}
	let url = elm.href
	if (!url.startsWith(base)) {
		return
	}
	event.preventDefault()
	to(url.slice(base.length))
}

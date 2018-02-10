'use strict';

/* global chrome:false */

var duration = 5000;
var manifest = browser.runtime.getManifest();
var message = "Some lols before we go to school!"

// testing usage of chrom instead of browser for cross compatibility
chrome.browserAction.setBadgeBackgroundColor({color: '#eae'});
chrome.browserAction.setIcon({
	path: {
		48: "icons/tab-48.png",
		96: "icons/tab-96.png"
	}
});
function gotToSchool() {
	// clear notification first
	browser.notifications.clear("gotoschool");
	// No go to school website
	chrome.tabs.query({'url': 'http://chilloutandwatchsomecatgifs.com/'}, (tabs) => {
        		if (tabs.length === 1) {
          			chrome.tabs.update(tabs[0].id, {'active': true, 'url': "https://portal.psb-academy.edu.sg/OnlineCourseDisplay/"});
          		}
          	});
}


chrome.browserAction.onClicked.addListener(function(aTab) {
	browser.notifications.create("gotoschool", {
		"type": "basic",
		"iconUrl": browser.extension.getURL("icons/link-48.png"),
    	"title": manifest.name,
    	"message": message
	});	
	chrome.tabs.query({'url': 'http://chilloutandwatchsomecatgifs.com/', 'url': 'https://portal.psb-academy.edu.sg/OnlineCourseDisplay/'}, (tabs) => {
		if (tabs.length === 0) {
			// There are no cat gifs tabs
			console.log("There are no cat gifs..."); // for debugging
			chrome.tabs.create({'url': 'http://chilloutandwatchsomecatgifs.com/', 'active': true});
		} else {
			chrome.tabs.query({'url': 'http://chilloutandwatchsomecatgifs.com/', 'active': true}, (active) => {
        		if (active.length === 0) {
          			chrome.tabs.update(tabs[0].id, {'active': true});
        		}
      		});
		}
	});
	setTimeout(gotToSchool, duration);
});


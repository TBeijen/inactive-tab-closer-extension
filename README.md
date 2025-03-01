# Inactive Tab Closer Chrome extension

Does this sound recognizable?

* You are a tab hoarder
* You have an Azure portal tab open, forgot about it and moved to work on other things
* [This Azure portal setting](https://learn.microsoft.com/en-us/azure/azure-portal/set-preferences#signing-out--notifications) logs you out after 30mins of inactivity
* You find out you need to log in in EntraID again, most likely when you're already a bit late for a Teams meeting

Then this extension might be useful!

![Inactive Tab Closer Logo](inactive-tab-closer/logo.svg)

## Install

This extension has not been published to the Chrome marketplace.

To install:

* Optional (but recommended): Check the script contents to see what you will be running
* Clone the git repo
* Open [chrome://extensions/](chrome://extensions/)
* Make sure 'Developer mode' is enabled (top right)
* Select 'Load unpacked' and point to the cloned repo directory holding the `manigest.json` file
* Configure additional sites and timeout period if needed via the extension's 'options' screen

## Inspecting

In the [chrome://extensions/](chrome://extensions/) page, the extension shows a link 'inspect views service worker'. There you can follow `console.log` output of the extension activity.

## Permissions

This extension does not need site access. It needs access to your browsing history though, to examine tabs and check activity.

## Disclaimer

Created based on [Claude.ai](https://claude.ai/), which happily granted the extension full data access on the first response. Remember: AI is a great tool, but just like google, only if you ask it the right questions! 
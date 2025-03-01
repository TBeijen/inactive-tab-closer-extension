// background.js
const tabStates = new Map();

function matchesDomain(url, domains) {
    return domains.some(domain => {
        // Convert wildcard pattern to regex
        const regexPattern = '^' + domain.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$';
        const regex = new RegExp(regexPattern);

        try {
            const hostname = new URL(url).hostname;
            return regex.test(hostname);
        } catch {
            return false;
        }
    });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url) {
            tabStates.set(tab.id, Date.now());
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        tabStates.set(tabId, Date.now());
    }
});

setInterval(() => {
    chrome.storage.sync.get({
        monitoredDomains: ['*.azure.com', 'portal.azure.com'],
        inactivityMinutes: 30
    }, (items) => {
        const inactivityMs = items.inactivityMinutes * 60 * 1000;
        const now = Date.now();

        console.log('Checking tabs for inactivity. monitoredDomains:', items.monitoredDomains, 'inactivityMs:', inactivityMs, 'inactivityMinutes:', items.inactivityMinutes);

        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                if (!tab.url) return;

                // Check if tab matches monitored domains
                if (!matchesDomain(tab.url, items.monitoredDomains)) return;

                // Get last activity time
                const lastActivity = tabStates.get(tab.id) || 0;

                console.log('Checking tab.url:', tab.url, 'tab.id:', tab.id, 'Last activity:', lastActivity, 'now - lastActivity:', now - lastActivity);

                // Close if inactive
                if (now - lastActivity > inactivityMs) {
                    console.log('Closing tab.url:', tab.url, 'tab.id:', tab.id, 'now - lastActivity:', now - lastActivity);

                    chrome.tabs.remove(tab.id);
                    tabStates.delete(tab.id);
                }
            });
        });
    });
}, 60000); // Check every minute
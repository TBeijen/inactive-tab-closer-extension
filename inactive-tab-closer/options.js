// options.js
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

function saveOptions() {
    const domains = document.getElementById('domains').value
        .split('\n')
        .map(domain => domain.trim())
        .filter(domain => domain.length > 0);

    const inactivityTime = document.getElementById('inactivityTime').value;

    chrome.storage.sync.set({
        monitoredDomains: domains,
        inactivityMinutes: parseInt(inactivityTime)
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => { status.textContent = ''; }, 1500);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        monitoredDomains: ['*.azure.com', 'portal.azure.com'],
        inactivityMinutes: 25
    }, (items) => {
        document.getElementById('domains').value = items.monitoredDomains.join('\n');
        document.getElementById('inactivityTime').value = items.inactivityMinutes;
    });
}
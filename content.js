var title = document.querySelector('.page-title').textContent.trim();
chrome.runtime.sendMessage({"message": "open_new_tab", "title": title});

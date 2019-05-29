let save = document.getElementById('save');
let studentNum = document.getElementById('studentNum');
let studentPass = document.getElementById('studentPass');
let autologin = document.getElementById('autologin');
let disabled = document.getElementById('disabled');
let result = document.getElementById('result');
save.onclick = function() {
    chrome.storage.local.set({
        studentNum: studentNum.value
    });
    chrome.storage.local.set({
        studentPass: btoa(studentPass.value)
    });
    chrome.storage.local.set({
        autologin: autologin.checked
    });
    chrome.storage.local.set({
        disabled: disabled.checked
    });
    result.innerHTML = "Kaydedildi!";
};
chrome.storage.local.get(['studentNum'], function(result) {
    if (result.studentNum != undefined)
        studentNum.value = result.studentNum;
});
chrome.storage.local.get(['studentPass'], function(result) {
    if (result.studentPass != undefined)
        studentPass.value = window.atob(result.studentPass);
});

chrome.storage.local.get(['autologin'], function(result) {
    if (result.autologin != undefined)
        autologin.checked = result.autologin;
});
chrome.storage.local.get(['disabled'], function(result) {
    if (result.disabled != undefined)
        disabled.checked = result.disabled;
});
function start() {
    var studentNum = document.getElementsByName("id")[0];
    if (studentNum == undefined) return;
    var studentPass = document.getElementsByName("pass")[0];
    var loginBtn = document.getElementsByClassName("btn-login")[0];
    var captchaText = document.getElementById("TxtCaptcha");
    var img = document.getElementById("Image1");
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");

    var autologin = false;

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
            autologin = result.autologin;
    });

    function mesajGonder() {
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        if(dataURL==",")
            {
                mesajGonder();
                return;
            }
        chrome.runtime.sendMessage({
            base64: dataURL
        }, data => {
            console.log("***\n"+data+"\n"+dataURL);
            if ( data == -1) {
                new Promise(resolve => {
                        resolve(img.src = "../CaptchaHandler.ashx?captcha=" + Math.random())
                    })
                    .then(setInterval(() => {
                        mesajGonder();
                    }, 1500)).catch(e => console.log(e));
            } else {
                captchaText.value = data;
                if (autologin)
                    loginBtn.click();
            }
        });
    }
    mesajGonder();
}
chrome.storage.local.get(['disabled'], function(result) {
    if (result.disabled == undefined || !result.disabled)
        start();
});
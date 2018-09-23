$(document).ready(function() {
    new ClipboardJS('#copyButton');
    
    hsimp({
        options: {
            calculationsPerSecond: 1e10, // 10 billion,
            good: 31557600e3, // 1,000 years
            ok: 31557600 // 1 year
        },
        outputTime: function (time, input) {
            console.log(time);
        }
    }, document.getElementById("randomPassword"));

    var slider = document.getElementById("randomPasswordLength");
    var output = document.getElementById("randomPassword");
    var length = document.getElementById("randomPasswordLengthValue");
    
    length.innerHTML = slider.value;
    output.value = GenerateRandomPassword(slider.value);
    slider.oninput = function() {
        length.innerHTML = this.value;
        output.value = GenerateRandomPassword(this.value);
    }

    function GenerateRandomPassword(length = 24) {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890!#$%&()*+,-./:;<=>?@[]^_{|}~";
        var password = "";
        for (var x = 0; x < length; x++) {
            var i = Math.floor(Math.random() * chars.length);
            password += chars.charAt(i);
        }
        return password;
    }
});

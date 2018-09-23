$(document).ready(function() {
    var slider = document.getElementById("randomPasswordLength");
    var output = $("#randomPassword");
    var length = $("#randomPasswordLengthValue");

    new ClipboardJS('#copyButton');
    
    hsimp({
        options: {
            calculationsPerSecond: 1e10, // 10 billion,
            good: 31557600e3, // 1,000 years
            ok: 31557600 // 1 year
        },
        outputTime: function (time, input) {
            $("#time").html(time);
        }
    }, document.getElementById("randomPassword"));
    
    length.html(slider.value);
    output.val(GenerateRandomPassword(slider.value));
    slider.oninput = function() {
        length.html(this.value);
        output.val(GenerateRandomPassword(this.value));
    }

    $("#generatePassword").click( function(){
        output.val(GenerateRandomPassword(slider.value));
    });

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

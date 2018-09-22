$(document).ready(function() {
    new ClipboardJS('#copy-button');
    
    $("#GeneratePassword").click(function() {
        var length = $("input[name='length']:checked").val();
        $("#password").val(GenerateRandomPassword(length));
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

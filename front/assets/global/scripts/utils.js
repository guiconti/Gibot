$(document).ready(function () {

    console.log('ads');

    function sendHttpRequest(requestForm) {

        $.ajax({
            requestForm,
            success: function () {
                console.log("yey");
            },
            error: function () {
                console.log('aww');
            }
        });
    }

});
$(document).ready(function () {

    var TrelloActions = {
        LISTAR: {
            name: 'list',
            type: 'GET',
            urlSuffix: '/list'
        },
        INSERIR: {
            name: 'insert',
            type: 'POST',
            urlSuffix: '/insert'
        }
    };

    $('#trello_action').on('change', function(){

        if (this.value == TrelloActions.LISTAR.name) {

            $('#trello_card_div').hide();

        } else {

            $('#trello_card_div').show();

        }

    });

    $('#trello_form').submit(function (event) {
        // Impede o formulário de ser enviado normalmente
        event.preventDefault();

        var form = $(this);
        
        var trelloRequest = {
            name: form.find('#trello_card').val()
        };

        var trelloForm = {
            url: '/trello/' + form.find('#trello_board').val() + '/' + form.find('#trello_list').val(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                console.log(msg);
            },
            error: function () {
                console.log('aww');
            }
        };

        switch(form.find('#trello_action').val()){

            case TrelloActions.LISTAR.name:
                trelloForm.type = TrelloActions.LISTAR.type;
                trelloForm.url += TrelloActions.LISTAR.urlSuffix;
                break;

            case TrelloActions.INSERIR.name:
                trelloForm.type = TrelloActions.INSERIR.type;
                trelloForm.url += TrelloActions.INSERIR.urlSuffix;
                trelloForm.data = JSON.stringify(trelloRequest);
                break;

        };

        sendHttpRequest(trelloForm);
        
    });

    function sendHttpRequest(requestForm) {

        $.ajax(requestForm);
        
    }

});
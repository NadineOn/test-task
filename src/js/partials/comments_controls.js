var
    addBtn = $('.more-btn'),
    body = $('body'),
    closeBtn = $('.controls__item_close'),
    controlsBtn = $('.controls__item');


addBtn.bind('click', function() {
    var offset = count + countOffset
    initComments(offset);
});

body.bind('click', controlsBtn, function(e) {
    var el = $(e.target).closest('.comment__row_list'),
        id = el.data('id'),
        method,
        action = $(e.target).data('action'),
        dataString;

    if (action) {
        switch(action) {
            case "add":
                method = {_method: 'PUT'}
                dataString = '?content='+ $(".form-field").val();
                commentAction(dataString, method, action, id)
                break;
            case "reply":
                commentForm.find('.controls').show();
                commentForm.find(".form-field").val('');
                commentForm.insertAfter($(e.target).closest('.comm-data-wrapper'));
                break;
            case "edit":
                var txt = $(e.target).closest('.comm-data-wrapper').find('p').text()
                commentForm.find('.controls').show();
                commentForm.find(".form-field").val(txt);
                commentForm.insertAfter($(e.target).closest('.comm-data-wrapper'));
                break;
            case "delete":
                method = {_method: 'DELETE'}
                dataString = '?id='+ id;
                commentAction(dataString, method, action, id)
                break;
        }
    }
});

function commentAction(dataString, method, action, id) {
    $.ajax({
        url: url+dataString,
        type: 'GET',
        dateType: 'json',
        data: method,
        success: function(data){
            switch(action) {
                case "add":
                    alert('Add comment!');
                    $(".form-field").val('');
                    break;
                case "delete":
                    alert('Delete comment!');
                    setTimeout(function() {$('*[data-id='+id+']').fadeOut();}, 300);
                    break;
            }
        }
    });
}

body.bind('click', closeBtn, function(e) {
    if ($(e.target).is('.controls__item_close')) $(e.target).closest('.comment-form').remove();
})






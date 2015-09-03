var comm,
    count = 2, //  start count of comments
    countOffset =0,
    commBlock = $('.comment'),
    controlsOwnComm = $('.controls_own-comment').html(),
    commentForm = $('.comment-form'),
    //url = 'http://frontend-test.pingbull.com/pages/nadyaonishchenko@gmail.com/comments',
    url = 'data.json', //local file
    ownerId = 1; // user owner id

initComments(countOffset);

function initComments(countOff) {
    $.ajax({
        url: url,
        type: 'GET',
        dateType: 'json',
        data: {
            count : count,
            offset: countOff
        },
        success: function(data){
            comm = $.map(data, function(value){
                return value;
            });

            for (var i = 0; i < data.length; i++) {
                pushToList(i);
            }
        }
    });
    countOffset = countOff;

}

function pushToList(i) {
    var placeHtml =
        '<div class="comment__row comment__row_list" data-id="'+comm[i]['id']+'">' +
            '<div class="comm-avatar">' +
                '<div class="comm-avatar__user">' +
                    '<img src="'+comm[i]['author']['avatar']+'">' +
                '</div>' +
            '</div>' +
            '<div class="comm-data">' +
                '<div class="comm-data-wrapper">' +
                    '<span class="comm-data__user">'+comm[i]['author']['name']+'</span>' +
                    '<span class="comm-data__date">'+comm[i]['created_at']+'</span>' +
                    '<p>'+comm[i]['content']+'</p>';

                //check if author is owner of comment
                if (comm[i]['author']['id'] == ownerId) {
                    placeHtml += controlsOwnComm;
                }
            placeHtml +='</div>';
                // check children
                if (comm[i]['children'].length) {
                    for (var k=0; k < comm[i]['children'].length; k++) {
                        placeHtml +=
                        '<div class="comment__row comment__row_list">' +
                            '<div class="comm-avatar">' +
                                '<div class="comm-avatar__user">' +
                                    '<img src="'+comm[i]['children'][k]['author']['avatar']+'" alt="User name" >' +
                                '</div>' +
                            '</div>' +
                            '<div class="comm-data">' +
                                '<div class="comm-data-wrapper">' +
                                    '<span class="comm-data__user">'+comm[i]['children'][k]['author']['name']+'</span>' +
                                    '<span class="controls__item controls__item_forward">'+comm[i]['author']['name']+'</span>' +
                                    '<span class="comm-data__date">'+comm[i]['children'][k]['created_at']+'</span>' +
                                    '<p>'+comm[i]['children'][k]['content']+'</p>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    }
                }
            placeHtml += '</div>'+
    '</div>';
    commBlock.append(placeHtml);
}



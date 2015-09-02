var AppNS = {};

(function($, undefined){
    AppNS.init = function() {
        AppNS.initComments();
    };

    $(AppNS.init);

})(jQuery);

AppNS.initComments = function() {
    $.ajax({
        url: 'http://frontend-test.pingbull.com/pages/nadyaonishchenko@gmail.com/comments?count=5',
        type: 'GET',
        dateType: 'json',
//            data: {
//                _method: 'DELETE'
//            },
        success: function(data){
//                alert('fgdgfs')
            console.log(data)
        }
    });
}

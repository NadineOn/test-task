AppNS.initTabs = function() {
    var activeTab = $('.tabs__active').index();
    $('.tabs').tabs({
        'active': activeTab
    });
}
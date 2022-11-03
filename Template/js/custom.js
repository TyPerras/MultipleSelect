$(document).ready(function(){
    // Popover trigger
    $('[data-toggle="popover"]').popover();

    // Popover fade out once it looses focus
    $('.popover-dismiss').popover({
      trigger: 'focus'
    })

    // tooltip trigger per page (there can be multiple tooltips 
    // within a page but they need to sit within a div with this ID)
    $('.tooltip-1').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    })
});

/**
*Used for tab functionality to make the tab pills active and inactive
*stringInfo taken from a attribute id
*id is in the format "name-tabID-totalNumOfTabs"
**/
$(document).on("click", ".tabButton", function() {

    var stringInfo = this.id;
    var itemsArray = stringInfo.split("-");
    
    var name = itemsArray[0];
    var tabID = itemsArray[1];
    var numberOfTABS = itemsArray[2];

    $("." + name + tabID).addClass('active');

    for(x = 1; x <= numberOfTABS; x++) {
        if(x != tabID) {
            $("." + name + x).removeClass('active');
        }
    }

});
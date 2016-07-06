
$(document).ready(function () {
  // alert('in');

  $('#introPg').bind('click', function() {
    alert('in');
  });

  var marginY = 0;
  var destination = 0;
  var speed = 5;
  var scroller = null;

  function initScroll(elemId) {
    
    console.log('in');
    
    var elem = '#' + elemId;
    destination = $(elem).offset();

    console.log(destination);

    scroller = setTimeout(function () {
      initScroll(elemId);
    },1);

    marginY = marginY + speed;

    console.log(marginY);

    if (marginY >= destination.top) {
      clearTimeout(scroller);
    }

    window.scrollTo(0, marginY);
  }

  $('.gnbList').bind('click', function () {
    var clicked = $(this).attr('data-name');
    initScroll(clicked);
  });

  //검정색 카드 부분
  $('.cards').bind('mouseover', function (e) {
    $(this).css('opacity', 0);
    //color fadeout
  });

  $('.cards').bind('mouseleave', function (e) {
    $(this).css('opacity', 0.5);
    //color fadeout
  });
	
  
  var curr = 0;
	var scrollEvent = function() {
      $('body').one('mousewheel', function(e){
      var pageList = $(".page");
      if(e.originalEvent.wheelDelta < 0) {
       //scroll down
       console.log('Down');
        $(pageList[curr]).animate({"top":"-1000px"},1000, scrollEvent);
        $(pageList[curr+1%pageList.length]).animate({"top":"0px"},1000, scrollEvent);
        curr++;
      }else {
       //scroll up
       console.log('Up');
      }

      //prevent page fom scrolling
      return false;
    });
  }
  
  scrollEvent();

});

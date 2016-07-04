
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
    $(this).css('opacity', 1);
    //color fadeout
  });

});


$(document).ready(function () {

  var $elem = {
    introPg: $('#introPg'),
    downloadBtn: $('#download'),
    container: $('#container'),
    blocks: $('.projBlock'),
    gnbMenu: $('.gnbList'),
    logo: $('#logo'),
    body: $('body'),
    xBtn: $('#xBtn'),
    coloredBtn: $('#download .colorCover'),
    resumeTxt: $('#resumeTxt'),
    projModal: $('#projModal'),
    cards: $('.cards')
  }
  
  var destination = 0; 
  var curScroll = 0;

  scrollEvt();

  $elem.introPg.bind('click mousemove', function (e) {
    var self = $(this);
    if (e.type === 'click') {
      //scroll(900, slideDownAndUp($('#aboutPanel'), $('#aboutBox')));
    } else if (e.type === 'mousemove') {
      changeCursor(self);
    }

  });

  //검정색 카드 부분
  $elem.cards.bind('mouseenter', function (e) {
    var self = $(this);
    fadeInOut(self);
  });

  $elem.downloadBtn.bind('mouseenter mouseleave', function (e) {
    var self = $(this);
    if (e.type === 'mouseenter') {
      fillColor();
    } else if (e.type === 'mouseleave') {
      emptyColor();
    }

  });

  $elem.logo.bind('click mouseenter', function (e) {
    if (e.type === 'click') {
      //$elem.body.animate({scrollTop: 0}, 500);
    } else if (e.type === 'mouseenter') {
      liftLogo();
    }
  });

  $elem.gnbMenu.bind('mouseenter mouseleave click', function (e) {
    var self = $(this);

    if (e.type === 'mouseenter') {
      setTxtColor(self, '#FCD68A');
    } else if (e.type === 'mouseleave') {
      setTxtColor(self, '#111111');
    } else if (e.type === 'click') {
      e.preventDefault();
      var id = $(this).find('a').attr('href');
      var topVal = 0;
      var nextAniFunc;
      if (id === '#aboutPg') {
        topVal = 900;
        nextAniFunc = slideDownAndUp($('#aboutPanel'), $('#aboutBox'), 2000, 100, moveLines);
      }

      if (id === '#projectsPg') {
        topVal = 1800;
        nextAniFunc = slideDownShowBlock;
      }

      if (id === '#contactPg') {
        topVal = 2700;
        nextAniFunc = slideDownAndUp($('#contactPanel'), $('#contactInfo'), 2000, 150, scrollEvt);
      }

      scroll(topVal, nextAniFunc);
    }
  });

  $elem.blocks.bind('click', function () {
    var self = $(this).index();
    //해당 index가져오고
    console.log(self);
    projModal.css('display','block');
  });


  $elem.xBtn.bind('click', function (e) {
    projModal.css('display','none');
    e.preventDefault();
  });

  //dim영역 눌려도 닫히게?

  function scroll(topVal, nextAniFunc) {
    $elem.body.animate({scrollTop: topVal}, 500, nextAniFunc);
  }

  function changeCursor(cursorElem) {
    cursorElem.css('cursor', 'pointer');
  }

  function setTxtColor(text, setColor) {
    text.css('color', setColor);
  }

  function slideDownAndUp(panel, boxToShow, duration, moveTo, callbackAni) {
    slideDown(panel, duration);
    boxToShow.animate({top: moveTo}, duration, callbackAni);
  }

  function moveLines() {
    var lines = $('#texts').find('p');
    var idx = 0;

    var id = setInterval(showLine, 500);
    function showLine() {
      if (idx === lines.length) {
        clearInterval(id);
      } else {
        lines.eq(idx).fadeIn();
        idx++;
      }
    }

    showBtn();
  }
  
  function fadeInOut(fadeElem) {
    fadeElem.fadeOut().fadeIn();
  }

  function showBtn() {
    $elem.downloadBtn.animate({top: 750}, 6000, shakeBtn);
  }

  function shakeBtn() {
    var idx = 0;
    var id = setInterval(shake, 200);

    function shake() {
      if (idx === 3) {
        clearInterval(id);
      } else {
        $elem.downloadBtn.animate({marginLeft: -5}, 100, function () {
          $elem.downloadBtn.animate({marginLeft: 5}, 100);
        });
        idx++;
      }
    }
    scrollEvt();
  }

  function liftLogo() {
    var idx = 0;

    var id = setInterval(lift, 200);
    function lift() {
      if (idx === 2) {
        clearInterval(id);
      } else {
        $elem.logo.animate({marginTop: -5}, 100, function () {
          $elem.logo.animate({marginTop: 5}, 100);
        });
        idx++;
      }
    }
  }

  function fillColor() {
    coloredBtn.animate({width: 100}, 200, function () {
      resumeTxt.css('display', 'block');
    });
  }

  function emptyColor() {
    coloredBtn.animate({width:0}, 200, function () { 
      resumeTxt.css('display', 'none');
      coloredBtn.clearQueue();
    });
  }

  function slideDown(panel, time) {
    panel.slideDown(time);
  }

  //구 showCircle
  function slideDownShowBlock() {
    slideDown($('#projectPanel'), 500);
    
    var idx = 0;

    var id = setInterval(showBlocks, 300);

    function showBlocks() {
      if( idx === $elem.blocks.length) {
        clearInterval(id);
      } else {
        $elem.blocks.eq(idx).fadeIn();
        idx++;
      }
    }
    scrollEvt();
  }

  function scrollEvt() {
    $(window).one('mousewheel', function (e) {
      if(e.originalEvent.wheelDelta < 0) {
        console.log('Down');
        destination = curScroll + 900;
      } else {
        console.log('up');
        destination = curScroll - 900;
      }
      $elem.body.animate({scrollTop: destination}, 500, determineCallback);
      console.log(destination);
      //그 destination의 애니메이션
      curScroll = destination;
    });
  }

  function determineCallback() {
    console.log('inin');
    if (destination < 901) {
      slideDownAndUp($('#aboutPanel'), $('#aboutBox'), 2000, 100, moveLines);
    } else if (destination < 1801) {
      slideDownShowBlock();
    }else if (destination < 2701) {
      slideDownAndUp($('#contactPanel'), $('#contactInfo'), 2000, 150, scrollEvt);
    }
  }

});
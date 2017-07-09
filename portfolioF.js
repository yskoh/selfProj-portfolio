//팝업 안에 들어갈 데이터
var data = [
  {'name': 'News Feed', 'img': './img/newsfeed.jpg'},
  {'name': 'Black and White 2', 'img': './img/bnw2.jpg'},
  {'name': 'WPI', 'img': './img/wpi.jpg'},
  {'name': 'ppodo', 'img': './img/ppodo.jpg'},
  {'name': 'Squirrel Hero', 'img': './img/shero.jpg'}
];

//randAni에 들어갈 문자들
var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//scroll 가능, 불가능 표시
var scrFlag = false;
var cardsStr = '';
//페이지 index
var pgIdx = 0;
var aniId = {
  shakeId: 0,
  liftId: 0
};

var pgTimer = 0;
var linesTimer = [];
var blocksTimer = [];

var $elem = {
  container: $('#container'),
  pages: $('#pages'),
  gnb: {
    logo: $('#logo'),
    gnbMenuList: $('li[data-name="gnbList"]')
  },
  intro: {
    introPg: $('#introPg'),
    curtain: $('#curtain'),
    scrollTxt: $('#scrollTxt'),
    downArrow: $('#downArrow')
  },
  about: {
    coloredBtn: $('#download .colorCover'),
    resumeTxt: $('#resumeBtnTxt'),
    downloadBtn: $('#download'),
    texts: $('#texts'),
    aboutPanel: $('#aboutPanel'),
    aboutBox: $('#aboutBox')
  },
  proj: {
    blocks: $('li[data-name="projBlock"]'),
    xBtn: $('#xBtn'),
    projModal: $('#projModal'),
    projName: $('div[data-name="projName"]'),
    projImg: $('div[data-name="projImg"]'),
    projPanel: $('#projectPanel'),
    projects: $('div[data-name="projs"]')
  },
  cont: {
    contInfo: $('#contactInfo'),
    contactPanel: $('#contactPanel'),
    nums: $('span[data-name="num"]'),
    ltrs: $('span[data-name="ltr"]'),
    symbs: $('span[data-name="symb"]')
  }
};

$(document).ready(function () {
  
  //55개 카드 만들기
  for (var i = 0; i < 55; i++) {
    cardsStr += '<div class="cards" data-val="cards"></div>'
  }
  $elem.intro.curtain.append(cardsStr);

  var gnb = {
    logoFunc: function (e) {
      var self = $(this);
      if (e.type === 'click') {
        pgIdx = 0;
        resetAni();
        resetPanel();
        pagination(pgIdx);
      } else if (e.type === 'mouseenter') {
        introPg.lift(self);
      } else {
        return;
      }
    },

    menuFunc: function (e) {
      var self = $(this);

      if (e.type === 'mouseenter') {
        self.css('color', '#FCD68A');
      } else if (e.type === 'mouseleave') {
        self.css('color', '#111111');
      } else if (e.type === 'click') {
        e.preventDefault();
        resetAni();
        resetPanel();
        pgIdx = self.index() + 1;
        scrFlag = true;
        pagination(pgIdx);
      } else {
        return;
      }
    }
  };

  var introPg = {
    introPgFunc: function (e) {
      var self = $(this);
      if (e.type === 'click') {
        resetAni();
        resetPanel();
        pgIdx = self.index() + 1;
        pagination(pgIdx);
      } else if (e.type === 'mousemove') {
        self.css('cursor', 'pointer');
      } else {
        return;
      }
    }, 

    curtainFunc: function (e) {
      var self = $(this);
      introPg.fadeInOut(self);
    },

    lift: function ($elem2Lift) {
      var idx = 0;
      aniId.liftId = setInterval(up, 200);

      function up() {
        if (idx === 2) {
          clearInterval(aniId.liftId);
        } else {
          $elem2Lift.animate({marginTop: -5 + 'px'}, 100, function () {
            $elem2Lift.animate({marginTop: 5 + 'px'}, 100);
          });
          idx++;
        }
      }
    },

    fadeInOut: function ($fadeElem) {
      $fadeElem.animate({opacity: 0}, 300, function () {
        $fadeElem.animate({opacity: 1}, 300);
      });
    }
  };

  var aboutPg = {
    resumeBtnFunc: function (e) {
      var self = $(this);
      if (e.type === 'mouseenter') {
        button.fillColor();
      } else if (e.type === 'mouseleave') {
        button.emptyColor();
      } else {
        return;
      }
    },

    moveLines: function () {
      var lines = $elem.about.texts.find('p').hide();

      lines.each(function (idx) {
        var $line = $(this);
        linesTimer.push(setTimeout(function () {$line.show().css('opacity', '0').animate({opacity: '1'});}, 500 * idx));
      });

      button.showBtn();
    }
  };

  var button = {
    shakeBtn: function () {
      var idx = 0;
      aniId.shakeId = setInterval(shake, 100);
      var left = parseInt($elem.about.downloadBtn.css('margin-left'));

      function shake() {
        if (idx === 3) {
          clearInterval(aniId.shakeId);
          $elem.about.downloadBtn.stop().animate({marginLeft: left}, 50); 
        } else {
          $elem.about.downloadBtn.animate({marginLeft: left - 5 + 'px'}, 50, function () {
            $elem.about.downloadBtn.animate({marginLeft: left + 5 + 'px'}, 50); 
          });
          idx++;
        }
      }
      scrFlag = false;
      scrollEvt();
    },

    showBtn: function () {
      $elem.about.downloadBtn.stop().delay(2000).animate({top: 750 + 'px'}, 4000, button.shakeBtn);
    },

    fillColor: function () {
      $elem.about.coloredBtn.stop().animate({width: 100 + 'px'}, 200, function () {
        $elem.about.resumeTxt.css('display', 'block');
      });
    },

    emptyColor: function () {
      $elem.about.coloredBtn.stop().animate({width: 0 + 'px'}, 200, function () { 
        $elem.about.resumeTxt.css('display', 'none');
      });
    }
  };

  var projPg = {
    addOpenProj: function () {
      var selfIdx = $(this).index();
      $elem.proj.projName.append('<span>' + data[selfIdx].name + '</span>');
      var img = $('<img src="' + data[selfIdx].img + '" width="604.8px" height="432px">');
      $elem.proj.projImg.append(img);
      $elem.proj.projPanel.addClass('dim');
      $elem.proj.projModal.css('display', 'block');
      scrFlag = true;
    },

    closeProj: function (e) {
      e.preventDefault();
      $elem.proj.projPanel.removeClass('dim');
      $elem.proj.projModal.css('display', 'none');
      $elem.proj.projName.empty();
      $elem.proj.projImg.empty();
      scrFlag = false;
    },

    projCursor: function () {
      var self = $(this);
      self.css('cursor', 'pointer');
    },

    showBlockBlob: function () {
      $elem.proj.blocks.each(function (idx) {
        if (idx < $elem.proj.blocks.size() - 1) {
          $(this).delay(500 * idx).fadeIn(500);
        } else {
          $(this).delay(500 * idx).fadeIn(500, function(){
            scrFlag = false;
            scrollEvt();
          });
        };
      });
    }
  };

  var contPg = {
    randAni: function ($self, finalVal, randArr) {
      var _randId = setInterval(showRand, 100);
      var runCnt = 0;

      function showRand() {
        if (runCnt >= 10) {
          clearInterval(_randId);
          $self.text(finalVal);
        } else {
          idx = Math.floor((Math.random() * randArr.length));
          $self.text(randArr[idx]);
        }
        runCnt++;
      }
    },

    showRand: function (randArray) {
      return function () {
        var self = $(this);
        var dataValue = self.attr('data-val');
        contPg.randAni(self, dataValue, randArray);
      };
    }
  };

   //event bindings
  $elem.gnb.logo.bind('click mouseenter', gnb.logoFunc);
  $elem.gnb.gnbMenuList.bind('mouseenter mouseleave click', gnb.menuFunc);
  $elem.intro.introPg.bind('click mousemove', introPg.introPgFunc);
  $elem.intro.curtain.find('div').bind('mouseenter', introPg.curtainFunc);
  $elem.about.downloadBtn.bind('mouseenter mouseleave', aboutPg.resumeBtnFunc);
  $elem.proj.blocks.bind('click', projPg.addOpenProj);
  $elem.proj.xBtn.bind('click', projPg.closeProj);
  $elem.proj.projects.bind('mouseenter', projPg.projCursor);
  $elem.cont.nums.bind('mouseenter', contPg.showRand(nums));
  $elem.cont.ltrs.bind('mouseenter', contPg.showRand(alpha));
  $elem.cont.symbs.bind('mouseenter', contPg.showRand(alpha));

  /**
   * scrollEvt scroll 컨트롤한다.
   */
  function scrollEvt() {
    $elem.container.bind('mousewheel', function (e) {
      var self = $(this);

      if (scrFlag) { return; }

      scrFlag = true;
      self.unbind('mousewheel');
      if (e.originalEvent.wheelDeltaY < 0) {
        //down
        if (pgIdx < 3) {
          resetAni();
          resetPanel();
          pgIdx++;
        } else {
          pgIdx = 3;
        }
      } else {
        //up
        if (pgIdx > 0) {
          resetAni();
          resetPanel();
          pgIdx--;
        } else {
          pgIdx = 0;
        }
      }
      pagination(pgIdx);
    });
  }

  /**
   * pgAni  해당 page의 animation 보여준다.
   * @param  {Number} num [page index]
   */
  function pgAni(num) {
    if (num === 0) {
      //다시 내려오게
      $elem.intro.curtain.slideDown(2500, function () {
        $elem.intro.scrollTxt.fadeIn();
        $elem.intro.downArrow.fadeIn();
        scrFlag = false;
        scrollEvt();
      });
    } else if (num === 1) {
      $elem.about.aboutPanel.slideDown(500);
      $elem.about.aboutBox.delay(500).animate({top: 100 + 'px'}, 1000);
      pgTimer && clearTimeout(pgTimer);
      pgTimer = setTimeout(aboutPg.moveLines, 1500);
    } else if (num === 2) {
      $elem.proj.projPanel.slideDown(500);
      //???
      pgTimer && clearTimeout(pgTimer);
      pgTimer = setTimeout(projPg.showBlockBlob, 500);
    } else if (num === 3) {
      $elem.cont.contactPanel.slideDown(500);
      $elem.cont.contInfo.delay(500).animate({top: 150 + 'px'}, 1000);
      pgTimer && clearTimeout(pgTimer);
      //???
      pgTimer = setTimeout(function () {scrFlag = false; scrollEvt();}, 1500);
    } else {
      return;
    }
  }

  /**
   * resetAni animation을 reset한다.
   * 
   */
  function resetAni() {
    //intro page
    clearInterval(aniId.liftId);
    $elem.intro.scrollTxt.fadeOut();
    $elem.intro.downArrow.fadeOut();
    //about page
    $elem.about.aboutBox.stop().clearQueue();
    $elem.about.aboutBox.css('top', 1050 + 'px');
    // moveLines
    //moveline cleartimeout
    if (linesTimer.length > 0) {
      for (var i = 0, loop = linesTimer.length; i < loop; i++) {
        clearTimeout(linesTimer[i]);
      }
    } 
    linesTimer = [];
    $elem.about.texts.find('p').stop().clearQueue();
    $elem.about.texts.find('p').hide();
     //hide button
    $elem.about.downloadBtn.clearQueue();
    $elem.about.downloadBtn.css('top', 1050 + 'px');
    clearInterval(aniId.shakeId);
    //projects page
    if (blocksTimer.length > 0) {
      for (var i = 0, loop = blocksTimer.length; i < loop; i++) {
        clearTimeout(blocksTimer[i]);
      }
    }
    blocksTimer = [];
    $elem.proj.blocks.stop().clearQueue();
    $elem.proj.blocks.css('opacity', 1);
    $elem.proj.blocks.hide();
    //contacts page
    $elem.cont.contInfo.clearQueue();
    $elem.cont.contInfo.css('top', 1050 + 'px');
  }

  /**
   * resetPanel 내려오는 panel을 reset한다.
   */
  function resetPanel() {
    $elem.intro.curtain.clearQueue();
    $elem.intro.curtain.css('display', 'none');
    $elem.about.aboutPanel.clearQueue();
    $elem.about.aboutPanel.css('display', 'none');
    $elem.proj.projPanel.clearQueue();
    $elem.proj.projPanel.css('display', 'none');
    $elem.cont.contactPanel.clearQueue();
    $elem.cont.contactPanel.css('display', 'none');
  }

  /**
   * pagination 해당 페이지의 부분으로 이동한다.
   * @param  {Number} num [page index]
   */
  function pagination(num) {
    var pos = -$elem.container.height() * num;
    $elem.pages.stop().animate({'marginTop': pos}, 500, function () {
      pgAni(num);
    });
  }

  //스크롤 처음에 걸기
  $elem.intro.curtain.delay(2000).slideDown(500, function () {
    $elem.intro.scrollTxt.fadeIn();
    $elem.intro.downArrow.fadeIn();
    scrFlag = false;
    scrollEvt();
  });

});

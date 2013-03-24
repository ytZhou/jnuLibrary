 /*
    @Fun
		暨南大学图书馆豆瓣插件
    @Author
   		zyt
    @Email
  		icrt4694@gmail.com
  */

  ;(function (exports, undefined) {
    /*
      @Fun
        zytJnuLibrary命名空间
        |-until       封装通用函数
        |-jnuLibrary  封装暨大图书馆信息相关的函数
        |-douban      封装豆瓣信息相关的函数
        |-constant    用来管理常量
    */
    var zytJnuLibrary = {
      "until": {
        /*
          @Fun
            实现方法和属性的简单继承
        */
        extend: function (target, obj) {
          for(var i in obj){
            target[i] = obj[i];
          }
        },
      },
      "jnuLibrary": {},
      "douban": {},
      "constant": {}
    };

    //减短变量长度
    var until = zytJnuLibrary.until,
      jnuLibrary = zytJnuLibrary.jnuLibrary,
      douban = zytJnuLibrary.douban
      constant = zytJnuLibrary.constant;

    //给constant添加常量
    until.extend(constant, {
      /*
        @Fun
          封装常量
      */
      "jnuLibraryURL": "http://202.116.13.244/search~S1*chx?/",
      "doubanURL": "book.douban.com/subject/",
      "currentPageURL": window.location.href,
      "isbn": "",
    });

    //给until添加方法
    until.extend(until, {
      /*
        @Fun
          初始化函数
      */
      init: function () {
        var currentSite = this.checkURL();
        switch (currentSite) {
          case "jnuLibrary":
            constant.isbn = jnuLibrary.getISBN();
            break;
          case "douban":
            constant.isbn = douban.getISBN();
            break;
        }
        until.searchByISBN(constant.isbn);
      },
      /*
        @Fun
          判断当前网址，是暨大图书馆or豆瓣
      */
      checkURL: function () {
        var sign = constant.currentPageURL.search(constant.doubanURL);
        if (sign == -1) {
          return 'jnuLibrary';
        } else{
          return 'douban';
        }
      },
      /*
        @Fun
          通过ajax发起请求，获取相应页面
        @Options
          isbn  一本书的isbn号
      */
      searchByISBN: function (isbn){
        var currentSite = this.checkURL(),
            aimURL = "";
        switch (currentSite) {
          case "jnuLibrary":
            aimURL = "http://book.douban.com/subject_search?search_text="+isbn+"&cat=1001";
            break;
          case "douban":
            aimURL = "http://202.116.13.244/search*chx/?searchtype=i&searcharg="+isbn+"&SORT=D&searchscope=1&x=44&y=8";
        }
        xml = new XMLHttpRequest();
        var tempStr = "";
        xml.onreadystatechange = function () {
          if (xml.readyState == 4){
            if (xml.status == 200) {
              switch (currentSite) {
                case "jnuLibrary":
                  tempStr = douban.getMessage(xml.responseText);
                  until.showMessage(tempStr);
                  break;
                case "douban":
                  tempStr = jnuLibrary.getMessage(xml.responseText);
                  until.showMessage(tempStr);
                  break;
              }
            }
          }
        };
        xml.open("get", aimURL, false);
        xml.send(null);
      },
      /*
        @Fun
          展示书籍相关信息
        @Options
          str 相关信息的html结构
      */
      showMessage: function (str) {
        var divRap = document.createElement("div");
        divRap.setAttribute("id", 'zytJnuLibrary');
        until.css(divRap, {
          "position": "absolute",
          "width": "355px",
          "height": "230px",
          "padding": "30px",
          "top": '214px',
          "left": "-398px",
          "background": "rgba(255, 255, 255, 0.94)",
          "box-shadow": "4px 4px 3px rgb(185, 185, 185)",
          "border": "1px solid rgb(213, 213, 213)"
        });
        divRap.innerHTML = str;
        var button = document.createElement("div");
        button.setAttribute("id", "zytJnuLibrary_sideButtton");
        until.css(button, {
          'position': 'absolute',
          'right': '0px',
          'top': '0px',
          'width': '17px',
          'height': '47%',
          'padding-top': '43%',
          'font-size': '24px',
          'color': 'rgb(99, 95, 95)',
          "border-left": '1px solid rgb(228, 228, 228)',
          'background': 'rgba(231, 231, 231, 0.31)',
        });
        button.innerHTML = ">";
        button.addEventListener("mouseover", function (e) {
          zytJnuLibrary.until.css(this, {
            "background": 'rgba(128, 126, 126, 0.31)',
          });
        }, false);
        button.addEventListener("mouseout", function (e) {
          zytJnuLibrary.until.css(this, {
            'background': 'rgba(231, 231, 231, 0.31)',
          });
        }, false);
        button.addEventListener("click", function(e){
          var aimRap = document.getElementById("zytJnuLibrary"),
            hideLeft = 398,
            left = aimRap.style.left,
            that = document.getElementById("zytJnuLibrary_sideButtton");
            console.log(that);
          if (left == '0px'){
            //把目标隐藏
            setTimeout(function () {
              hideLeft -= Math.ceil(hideLeft*8/100);
              if (hideLeft<0) {
                hideLeft = 0;
              }
              var aimLeft = -398+hideLeft;
              zytJnuLibrary.until.css(aimRap, {
                "left": aimLeft+"px"
              });
              if(hideLeft != 0){
                setTimeout(arguments.callee, 50);
              }
            },50);
            that.innerHTML = ">";
          } else {
            //显示目标
            setTimeout(function () {
              hideLeft -= Math.ceil(hideLeft*8/100);
              if (hideLeft<0) {
                hideLeft = 0;
              }
              zytJnuLibrary.until.css(aimRap, {
                "left": -hideLeft+"px"
              });
              if (hideLeft != 0) {
                setTimeout(arguments.callee, 50);
              }
            },50);
            that.innerHTML = "<";
          }
        }, false);
        divRap.appendChild(button);
        document.body.appendChild(divRap);
      },
      /*
        @Fun
          设置目标节点的样式值
        @Options
          node  目标节点
          css   css的值
      */
      css: function (node, css) {
        for (var attr in css) {
          node.style[attr] = css[attr];
        }
      },
    });

    //给jnuLibrary添加方法和属性
    until.extend(jnuLibrary, {
      /*
        @Fun
          在暨大图书馆某本书的详情页面获取这本书的ISBN号
      */
      getISBN: function () {
        var aimText = document.getElementById("isbn").getElementsByClassName("bibInfoData")[0].innerHTML,
            tempText = aimText.split(" ")[0].split("-");
        aimText = "";
        for(var i = 0, len = tempText.length; i<len; i++){
          aimText += tempText[i];
        }
        return aimText;
      },
      /*
        @Fun
          返回搜索页面相关信息
        @Options
          str   页面html代码
      */
      getMessage: function (str) {
        if (str.search("未找到符合查询条件的馆藏;") != -1) {
          //没有找到相关书籍
          str = "<div><a href='http://lib.jnu.edu.cn/service/ServInfo.action?id=56&expandable=56' target='_blank'>好书荐购</a></div>";
          return str;
        }
        var starSign = str.indexOf('id="items_for_sms"'),
            endSign = str.indexOf('id="greenload"');
        //获取大致信息
        str = str.slice(starSign, endSign);
        //再进一步获取
        starSign = str.indexOf(">"),
        endSign = str.indexOf("</div>");
        str = str.slice(starSign+1, endSign);
        return str;
      },
    });

    //给douban添加方法和属性
    until.extend(douban, {
      /*
        @Fun
          在豆瓣某本书的详情页面获取这本书的ISBN号
      */
      getISBN: function () {
        var aimText = document.getElementById("info").innerHTML,
            lastBrIndex = aimText.lastIndexOf("<br>"),
            lastSpanIndex = aimText.lastIndexOf("</span>");
        //进一步提取
        aimText = aimText.slice(lastSpanIndex, lastBrIndex);
        aimText = aimText.slice(aimText.lastIndexOf(">")+1);
        return aimText;
      },
      /*
        @Fun
          返回搜索页面相关信息
        @Options
          str   页面html代码
      */
      getMessage: function (str) {
        var starSign = str.indexOf('id="content"'),
            endSign = str.indexOf('id="footer"');
        str = str.slice(starSign, endSign);
        starSign = str.indexOf("<ul"),
        endSign = str.indexOf("</ul>");
        str = str.slice(starSign, endSign) +"</ul>";
        return str;
      },
    });
    until.init();
    exports.zytJnuLibrary = zytJnuLibrary;
  })(window);


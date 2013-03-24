 /*
    @Fun
		暨南大学图书馆豆瓣插件
    @Author
   		zyt
    @Email
  		icrt4694@gmail.com
  */

  (function (exports, undefined) {
    /*
      @Fun
        zytJnuLibrary命名空间
        |-until       封装通用工具函数
        |-jnuLibrary  封装暨大图书馆相关的函数
        |-douban      封装豆瓣相关的函数
        |-constant    用来管理常量
    */
    var zytJnuLibrary = {
      "until": {
        /*
          @Fun
            实现方法和属性的简单继承
        */
        extend: function(target, obj){
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
      "currentPageURL": window.location.href
    });

    //给until添加方法
    until.extend(until, {
      /*
        @Fun
          判断当前网址，是暨大图书馆or豆瓣
      */
      checkURL: function () {
        if (constant.currentPageURL.search(constant.jnuLibrary) != -1) {
          return 'jnuLibrary';
        } else if (constant.currentPageURL.search(constant.doubanURL != -1)) {
          return 'douban';
        }
      },
    });

    //给jnuLibrary添加方法和属性
    until.extend(jnuLibrary, {
      /*
        @Fun
          isbn记下isbn值
      */
      isbn: "",
      /*
        @Fun
          初始化函数
      */
      init: function () {
        this.isbn = this.getISBN();
      },
      /*
        @Fun
          在暨大图书馆某本书的详情页面获取这本书的ISBN号
      */
      getISBN: function () {},
      /*
        @Fun
          通过ISBN号搜索这本书在暨大图书的情况
        @Options
          isbn  一本书的isbn号
      */
      searchByISBN: function (isbn) {},
      /*
        @Fun
          在某本书的详情页面展示这本书在豆瓣的情况
      */
      showMessage: function () {},
    });

    //给douban添加方法和属性
    until.extend(douban, {
      /*
        @Fun
          记下isbn值
      */
      isbn: "",
      /*
        @Fun
          初始化函数
      */
      init: function () {
        this.isbn = this.getISBN();
      },
      /*
        @Fun
          在豆瓣某本书的详情页面获取这本书的ISBN号
      */
      getISBN: function () {
        var info = document.getElementById("info");
      },
      /*
        @Fun
          在某本书的详情页面展示这本书在暨大的情况
      */
      showMessage: function () {},
      /*
        @Fun
          通过ISBN号搜索这本书在豆瓣上的情况
        @Options
          isbn  一本书的isbn号
      */
      searchByISBN: function (isbn) {},
    });

  })(window);


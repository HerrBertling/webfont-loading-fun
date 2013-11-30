// Generated by CoffeeScript 1.6.2
(function() {
  var _this = this,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $(window).ready(function() {
    var FontLoading, firstTimeFontLoad, fontAPIURL, fontFamilies, fontFamilySorting, fontsNotYetLoaded, yourAPIkey;

    yourAPIkey = 'AIzaSyCE1n4RANiXyCL2-bC-d9llZQsEvQKUixo';
    fontFamilySorting = 'popularity';
    fontAPIURL = 'https://www.googleapis.com/webfonts/v1/webfonts';
    fontFamilies = [];
    fontsNotYetLoaded = [];
    firstTimeFontLoad = true;
    $.getJSON("" + fontAPIURL + "?sort=" + fontFamilySorting + "&key=" + yourAPIkey, function(data) {
      var i, output;

      output = "<ul class='google-fonts'>";
      for (i in data.items) {
        if (__indexOf.call(data.items[i].subsets, "latin") >= 0 && __indexOf.call(data.items[i].variants, "regular") >= 0) {
          output += "<li style='font-family:\"" + data.items[i].family + "\", Helvetica'><input type='radio' name='fontselection' value='" + data.items[i].family + "' id='" + data.items[i].family + "' /><label for='" + data.items[i].family + "'>" + data.items[i].family + "</label></li>";
          fontFamilies.push(data.items[i].family);
        }
      }
      output += "</ul>";
      $('#fontselection-form').append("<strong>Google Webfonts (" + fontFamilies.length + " available)</strong>");
      $('#fontselection-form').append(output);
      $('#fontselection-form ul').hide();
      $('#fontselection-form strong').click(function() {
        $(this).next('ul').slideToggle();
        return $(this).toggleClass('opened');
      });
      return FontLoading(fontFamilies);
    });
    return FontLoading = function(fontList) {
      var font, fontArray, fontsToAdd, fontsToAddString, fontsToAddText, i, s, _i, _ref;

      fontsToAdd = [];
      for (i = _i = 0, _ref = fontList.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (!(i < 20)) {
          continue;
        }
        font = fontList.shift();
        fontsToAdd.push(font);
      }
      fontsToAddString = fontsToAdd.join('|');
      fontsToAddText = fontsToAddString.replace("|", "");
      fontArray = {
        google: {
          families: [fontsToAddString],
          text: [fontsToAddText]
        },
        active: function() {
          if (fontList.length > 0) {
            return FontLoading(fontList);
          }
        },
        inactive: function() {
          fontsNotYetLoaded.push(font);
          if (fontList.length > 0) {
            return FontLoading(fontList);
          }
        },
        timeout: 500
      };
      if (firstTimeFontLoad) {
        window.WebFontConfig = fontArray;
      } else {
        WebFont.load(fontArray);
      }
      if (firstTimeFontLoad) {
        s = document.createElement('script');
        s.src = "" + (document.location.protocol === 'https:' ? 'https' : 'http') + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
        s.type = 'text/javascript';
        s.async = 'true';
        document.body.appendChild(s);
      }
      return firstTimeFontLoad = false;
    };
  });

}).call(this);

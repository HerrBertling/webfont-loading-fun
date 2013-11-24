// Generated by CoffeeScript 1.6.2
(function() {
  var _this = this;

  $(window).ready(function() {
    var fontAPIURL, fontFamilies, fontFamilySorting, fontsNotYetLoaded, getCharacters, initializeFontLoading, loadFont, yourAPIkey;

    yourAPIkey = 'YourAPIkey';
    fontFamilySorting = 'alpha';
    fontAPIURL = 'https://www.googleapis.com/webfonts/v1/webfonts';
    fontFamilies = [];
    fontsNotYetLoaded = [];
    $.getJSON("" + fontAPIURL + "?sort=" + fontFamilySorting + "&key=" + yourAPIkey, function(data) {
      var i, output;

      output = "<ul>";
      for (i in data.items) {
        output += "<li style='font-family:\"" + data.items[i].family + "\", Helvetica'><input type='radio' name='fontselection' value='" + data.items[i].family + "' id='" + data.items[i].family + "' /><label for='" + data.items[i].family + "'>" + data.items[i].family + "</label></li>";
        fontFamilies.push(data.items[i].family);
      }
      output += "</ul>";
      document.getElementById("wrapper").innerHTML = output;
      return initializeFontLoading(fontFamilies);
    });
    initializeFontLoading = function(fontList) {
      var font, s;

      font = fontList.shift();
      console.log(getCharacters(font));
      window.WebFontConfig = {
        google: {
          families: [font],
          text: getCharacters(font)
        },
        active: function() {
          if (fontList.length > 0) {
            return loadFont(fontList);
          }
        },
        inactive: function() {
          fontsNotYetLoaded.push(font);
          if (fontList.length > 0) {
            return loadFont(fontList);
          }
        },
        timeout: 1000
      };
      s = document.createElement('script');
      s.src = "" + (document.location.protocol === 'https:' ? 'https' : 'http') + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
      s.type = 'text/javascript';
      s.async = 'true';
      return document.body.appendChild(s);
    };
    loadFont = function(fontList) {
      var font;

      font = fontList.shift();
      console.log(getCharacters(font));
      return WebFont.load({
        google: {
          families: [font],
          text: getCharacters(font)
        },
        active: function() {
          if (fontList.length > 0) {
            return loadFont(fontList);
          }
        },
        inactive: function() {
          fontsNotYetLoaded.push(font);
          if (fontList.length > 0) {
            loadFont(fontList);
          }
          return console.log(fontsNotYetLoaded);
        },
        timeout: 1000
      });
    };
    return getCharacters = function(stringWithCharacters) {
      var characterArray, found, newArr, newStr, origLen, x, y;

      characterArray = stringWithCharacters.split('');
      newArr = [];
      origLen = characterArray.length;
      found = void 0;
      x = void 0;
      y = void 0;
      x = 0;
      while (x < origLen) {
        found = 'undefined';
        y = 0;
        while (y < newArr.length) {
          if (characterArray[x] === newArr[y]) {
            found = true;
            break;
          }
          y++;
        }
        if (!found) {
          newArr.push(characterArray[x]);
        }
        x++;
      }
      newArr.sort();
      newStr = newArr.join('');
      newStr = newStr.replace('|', '');
      newStr = newStr.replace(' ', '');
      return newStr;
    };
  });

}).call(this);

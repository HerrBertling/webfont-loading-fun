$(window).ready =>
  yourAPIkey = 'AIzaSyAUOPNgxDiqhzZG_auoJMYsySfOVjFSlfs'
  fontFamilySorting = 'popularity'
  fontAPIURL = 'https://www.googleapis.com/webfonts/v1/webfonts'
  fontFamilies = []
  fontsNotYetLoaded = []
  $.getJSON "#{fontAPIURL}?sort=#{fontFamilySorting}&key=#{yourAPIkey}", (data) ->
    output = "<ul>"
    for i of data.items
      output += "<li style='font-family:\"#{data.items[i].family}\", Helvetica'><input type='radio' name='fontselection' value='#{data.items[i].family}' id='#{data.items[i].family}' /><label for='#{data.items[i].family}'>#{data.items[i].family}</label></li>"
      fontFamilies.push data.items[i].family
    output += "</ul>"
    document.getElementById("wrapper").innerHTML = output
    initializeFontLoading(fontFamilies)

  initializeFontLoading = (fontList) ->
    font = fontList.shift()
    console.log getCharacters(font)
    window.WebFontConfig =
      google:
        families: [font]
        text: getCharacters(font)
      active: () ->
        loadFont(fontList) if fontList.length > 0
      inactive: () ->
        fontsNotYetLoaded.push font
        loadFont(fontList) if fontList.length > 0
      timeout: 2000
    s = document.createElement 'script'
    s.src = "#{if document.location.protocol is 'https:' then 'https' else 'http'}://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
    s.type = 'text/javascript'
    s.async = 'true'
    document.body.appendChild(s)

  loadFont = (fontList) ->
    font = fontList.shift()
    console.log getCharacters(font)
    WebFont.load
      google:
        families: [font]
        text: getCharacters(font)
      active: () ->
        loadFont(fontList) if fontList.length > 0
      inactive: () ->
        fontsNotYetLoaded.push font
        if fontList.length > 0
          loadFont(fontList)
        else
          fontList.push fontsNotYetLoaded...
        console.log fontsNotYetLoaded
      timeout: 2000

  getCharacters = (stringWithCharacters) ->
    characterArray = stringWithCharacters.split('')
    newArr = []
    origLen = characterArray.length
    found = undefined
    x = undefined
    y = undefined
    x = 0
    while x < origLen
      found = `undefined`
      y = 0
      while y < newArr.length
        if characterArray[x] is newArr[y]
          found = true
          break
        y++
      newArr.push characterArray[x]  unless found
      x++
    newArr.sort()
    newStr = newArr.join('')
    newStr = newStr.replace('|', '')
    newStr = newStr.replace(' ', '')
    newStr
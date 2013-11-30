$(window).ready =>
  yourAPIkey = 'InsertYourAPIkey'
  fontFamilySorting = 'popularity'
  fontAPIURL = 'https://www.googleapis.com/webfonts/v1/webfonts'
  fontFamilies = []
  fontsNotYetLoaded = []
  $.getJSON "#{fontAPIURL}?sort=#{fontFamilySorting}&key=#{yourAPIkey}", (data) ->
    output = "<ul>"
    for i of data.items
      if "latin" in data.items[i].subsets and "regular" in data.items[i].variants
        output += "<li style='font-family:\"#{data.items[i].family}\", Helvetica'><input type='radio' name='fontselection' value='#{data.items[i].family}' id='#{data.items[i].family}' /><label for='#{data.items[i].family}'>#{data.items[i].family}</label></li>"
        fontFamilies.push data.items[i].family
    output += "</ul>"
    document.getElementById("wrapper").innerHTML = output
    initializeFontLoading(fontFamilies)

  initializeFontLoading = (fontList) ->
    fontsToAdd = []
    for i in [0...fontList.length] when i < 20
      font = fontList.shift()
      fontsToAdd.push font
    fontsToAddString = fontsToAdd.join('|')
    fontsToAddText = fontsToAddString.replace("|", "")
    window.WebFontConfig =
      google:
        families: [fontsToAddString]
        text: [fontsToAddText]
      active: () ->
        loadFont(fontList) if fontList.length > 0
      inactive: () ->
        fontsNotYetLoaded.push font
        loadFont(fontList) if fontList.length > 0
      timeout: 500
    s = document.createElement 'script'
    s.src = "#{if document.location.protocol is 'https:' then 'https' else 'http'}://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
    s.type = 'text/javascript'
    s.async = 'true'
    document.body.appendChild(s)

  loadFont = (fontList) ->
    fontsToAdd = []
    for i in [0...fontList.length] when i < 20
      font = fontList.shift()
      fontsToAdd.push font
    fontsToAddString = fontsToAdd.join('|')
    fontsToAddText = fontsToAddString.replace("|", "")
    console.log fontsToAddText
    WebFont.load
      google:
        families: [fontsToAddString]
        text: [fontsToAddText]
      active: () ->
        loadFont(fontList) if fontList.length > 0
      inactive: () ->
        fontsNotYetLoaded.push font
        loadFont(fontList) if fontList.length > 0
      timeout: 500
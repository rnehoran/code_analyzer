/*-------------------------------------------------------------
 * file: mark.js
 * description: display and alteration of rules graphics
 * created by: Roy Nehoran
 -------------------------------------------------------------*/


/***************************************************************
 * function: createRules
 * description: uses an array of rules to create rule graphics
 * parameters: none
 * return: null
 *
 **************************************************************/
function createRules(){

  /* ruleArray and blackList from global.js
   * for each rule in arrays of rules:
   *   makes indentation based on level
   *   sets color and picture based on list
   */
  var htmlAdd = '';
  for (var x = 0; x < ruleArray.length; x++) {
    for (var y = 0; y < ruleArray[x][LEVEL]; y++){
       htmlAdd += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    }
    var type;
    var img;
    switch(ruleArray[x][LIST_ORDER]){
      case 0:
        type = 'white';
        img = 'wrong';
        break;
      case 1:
        type = 'black';
        img = 'check';
        break;
      case 2:
        type = 'pref';
        img = 'wrong';
        break;
    }
    htmlAdd += '<div title="' + ruleArray[x][NAME] + '" class="rule ' + type + ' light" name="' + ruleArray[x][LEVEL] + '"><img src="images/' + img + '.png" class="status">&nbsp;&nbsp;' + ruleArray[x][NAME] + '</div><br><br>';
  }
  htmlAdd += '<br>'
  for (var v = 0; v < blackList.length; v++) {
    htmlAdd += '<div title="' + blackList[v][NAME] + '" class="rule black light" name="' + blackList[v][LEVEL] + '"><img src="images/check.png" class="status">&nbsp;&nbsp;' + blackList[v][NAME] + '</div><br><br>';
  }
  document.getElementById('code-rules').innerHTML += htmlAdd;
}

/***************************************************************
 * function: mark
 * description: sets color and picture in the code rules graphics,
 *              changes class name to reflect marking
 * parameters:
 *   -index: integer, index of code or rule statement in
 *           corresponding array to mark
 *   -flag: boolean, whether to change to positive or to negative
 *                   true --> darken, switch picture
 *                   false --> lighten, switch picture
 * return: null
 *
 * NOTE: does not affect graphic if it is already in desired state
 *
 ***************************************************************/
function mark(index, flag){

  // find list of all rules and check for valid index
  var list = document.getElementsByClassName('rule');
  if (index + 1 > list.length || index < 0){
    var msg = 'Error in mark();: outOfBoundsException in index called'
    document.getElementById('error').innerHTML = msg;
    return;
  }

  // check if the rule is not marked already
  if ((list[index].className.indexOf('light') != -1 && !flag) || (list[index].className.indexOf('dark') != -1 && flag)){
    return;
  }

  // change color, picture, and class name accordingly
  switch (flag){
    case true:
      if (list[index].className.indexOf('white') != -1){
        color = '#699B69';
      }
      else if (list[index].className.indexOf('black') != -1){
        color = '#A83A3F';
      }
      else if (list[index].className.indexOf('pref') != -1){
        color = '#6E6FA1';
      }
      var imgList = list[index].getElementsByTagName('img');
      var src = imgList[0].src;
      if (src.indexOf('check') != -1){
          imgList[0].src = 'images/wrong.png';
      }
      if (src.indexOf('wrong') != -1){
          imgList[0].src = 'images/check.png';
      }
      list[index].style.backgroundColor = color;
      var newClass = list[index].className.replace('light', 'dark');
      list[index].className = newClass;
      break;
    case false:
      if (list[index].className.indexOf('white') != -1){
        color = '#AFCAAF';
      }
      else if (list[index].className.indexOf('black') != -1){
        color = '#D7B7B7';
      }
      else if (list[index].className.indexOf('pref') != -1){
        color = '#C6C6D2';
      }
      var imgList = list[index].getElementsByTagName('img');
      var src = imgList[0].src;
      if (src.indexOf('check') != -1){
          imgList[0].src = 'images/wrong.png';
      }
      if (src.indexOf('wrong') != -1){
          imgList[0].src = 'images/check.png';
      }
      list[index].style.backgroundColor = color;
      var newClass = list[index].className.replace('dark', 'light');
      list[index].className = newClass;
  }
}

/***************************************************************
 * function: markRules
 * description: mark all rules previously validated
 * parameters: none
 * return: null
 *
 ***************************************************************/
function markRules(){

  /* for each rule in ruleArray:
   *   if validated, mark rule positive
   */
  var allVal = true;
  for (var v = 0; v < ruleArray.length; v++){
    if (ruleArray[v][VAL]){
      mark(v, true);
    }
    if (!ruleArray[v][VAL] && ruleArray[v][LIST_ORDER] == 0){
      allVal = false;
    }
  }

  /* for each rule in blackList:
   *   if validated, mark rule positive
   */
  for (var w = 0; w < blackList.length; w++){
    if (blackList[w][VAL]){
      mark(w + ruleArray.length, true);
      allVal = false;
    }
  }

  /* if all of ruleArray is validated,
   * and all of blackList is not:
   *   make title green
   */
  if (allVal){
    document.getElementById('title').style.backgroundColor = '#699B69';
  }
  else {
    document.getElementById('title').style.backgroundColor = '#A16AC8';
  }
}

/***************************************************************
 * function: clearMarks
 * description: resets all validations of rules and code
 *              statements to false, and marks all rules
 *              negative
 * parameters: none
 * return: none
 *
 ***************************************************************/
function clearMarks(){

  /* clear rules in ruleArray
   */
  for (var v = 0; v < ruleArray.length; v++){
    if (ruleArray[v][VAL]){
      ruleArray[v][VAL] = false;
      mark(v, false);
    }
  }

  for (var v = 0; v < blackList.length; v++){
    if (blackList[v][VAL]){
      blackList[v][VAL] = false;
      mark(v + ruleArray.length, false);
    }
  }

  /* clear code statements in codeArray
   */
  for (var x = 0; x < codeArray.length; x++){
    codeArray[x][VAL] = false;
  }
}

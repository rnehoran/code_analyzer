/*-------------------------------------------------------------
 * file: match.js
 * description: compares the code and rule arrays to find
 *              matches
 * created by: Roy Nehoran
 -------------------------------------------------------------*/


/***************************************************************
 * function: testOnInterval
 * description: clears and tests code
 * parameters: none
 * return: null
 *
 ***************************************************************/
function testOnInterval(){
  var tempCode = editor.getValue();
  setInterval(function(){
    var currentCode = editor.getValue();
    if (currentCode != tempCode){
      clearAndTest();
    }
    tempCode = currentCode;
  }, 1000);
}

/***************************************************************
 * function: clearAndTest
 * description: clears and tests code
 * parameters: none
 * return: null
 *
 ***************************************************************/
function clearAndTest(){
  clearMarks();
  testCode();
}

/***************************************************************
 * function: testCode
 * description: parses, and then tests code on given rules
 * parameters: none
 * return: null
 *
 ***************************************************************/
function testCode(){
  // parse entered code
  parse();

  /* starting on largest level to 0:
   *   for every rule in level, checks and validates all code statements in level,
   *     calls existInCode() on current level, index of rule, and index of code statement
   */
  for (var currentLevel = getLongestPath(); currentLevel > -1; currentLevel--){
    for (var ruleIndex = getFirstInLevel(currentLevel, ruleArray); ruleIndex > -1; ruleIndex = getNextInLevel(ruleIndex, ruleArray)){
       for (var codeIndex = getFirstInLevel(currentLevel, codeArray); codeIndex > -1; codeIndex = getNextInLevel(codeIndex, codeArray)){
         existInCode(currentLevel, ruleIndex, ruleIndex, codeIndex);
       }
    }
  }

  // check for code statements that appear in blacklist
  testBlackList();

  // mark all validated rules
  markRules();
}

/***************************************************************
 * function: existInCode
 * description: checks and validates a code statement and its
 *              parents compared to a rule
 * parameters:
 *   -ruleLevel: integer, level of rule
 *   -ruleIndex: integer, index of rule in ruleArray
 *   -orgRuleIndex: integer, index of starting rule in ruleArray
 *   -orgCodeIndex: integer, index of starting code statement in
 *                  codeArray
 * return: null
 *
 ***************************************************************/
function existInCode(ruleLevel, ruleIndex, orgRuleIndex, orgCodeIndex){

  // get array of indexes of matching code statements
  var codeIndexArray = findInCode(ruleLevel, ruleIndex);

  /* for each code statement index in the array:
   *   checks all parents
   */
  for (var x = 0; x < codeIndexArray.length; x++){
    if (checkPath(ruleLevel, ruleIndex, orgRuleIndex, codeIndexArray[x], codeIndexArray[x])){
      break;
    }
  }
}

/***************************************************************
 * function: checkPath
 * description: recursively checks the code statement and all
 *              its parents, and then validates them
 * parameters:
 *   -ruleLevel: integer, level of rule
 *   -ruleIndex: integer, index of rule in ruleArray
 *   -orgRuleIndex: integer, index of starting rule in ruleArray
 *   -orgCodeIndex: integer, index of starting code statement in
 *                  codeArray
 *   -codeIndex: index of current code statement in check
 * return: boolean, whether code statements and all its parents
 *         correspond with rule
 *
 ***************************************************************/
function checkPath(ruleLevel, ruleIndex, orgRuleIndex, orgCodeIndex, codeIndex){

  /* terminating condition:
   *   level of current statement is -1,
   *   meaning that all previous code statements comply with
   *   rule hierarchy
   * if condition filled:
   *   marks code statement and all of its parents
   *   exits function
   */
  if (ruleLevel == -1){
    validateAll(orgRuleIndex, ruleArray);
    validateAll(orgCodeIndex, codeArray);
    return true;
  }

  /* terminating condition:
   *   rule name is different from code statement name
   */
  if (ruleArray[ruleIndex][NAME] != codeArray[codeIndex][NAME]){
    return false;
  }

  /* gets parent of rule and code statement
   * calls check path on parents to compare them,
   * and returns result
   */
  var ruleParent = getParent(ruleLevel, ruleIndex, ruleArray);
  var codeParent = getParent(codeArray[codeIndex][LEVEL], codeIndex, codeArray);
  return checkPath(ruleLevel - 1, ruleParent, orgRuleIndex, orgCodeIndex, codeParent);
}

/***************************************************************
 * function: findInCode
 * description: finds all statements in codeArray that match
 *              indicated index in ruleArray by statement name
 * parameters:
 *   -level: integer, level of statement sought in codeArray
 *   -ruleIndex: integer, index of rule to match with statement
 * return: array, of all indexes that match the rule indicated
 *         by ruleIndex
 *
 * NOTE: returns an empty array if not found
 *
 ***************************************************************/
function findInCode(level, ruleIndex){
  var foundArray = [];

  /* for each code statement, check that:
   *   current code statement is not yet validated
   *   rule level and code statement level are equal
   *   rule name and code statement name are equal
   * if conditions filled:
   *   add index of code statement to array
   */
  for (var x = 0; x < codeArray.length; x++){
    if (!codeArray[x][VAL]
        && level == codeArray[x][LEVEL]
        && ruleArray[ruleIndex][NAME] == codeArray[x][NAME]){

      foundArray.push(x);
    }
  }
  return foundArray;
}

/***************************************************************
 * function: testBlackList
 * description: tests each code statement on blacklist rules
 * parameters: none
 * return: null
 *
 ***************************************************************/
function testBlackList(){

  /* if the blacklist contains any rules,
   * for every rule:
   *   check if any code statements match the rule
   *   validate accordingly
   */
  if (blackList.length > 0){
    for (var n = 0; n < blackList.length; n++){
      for (var x = 0; x < codeArray.length; x++){
        if (blackList[n][NAME] == codeArray[x][NAME]){
          blackList[n][VAL] = true;
        }
      }
    }
  }
}

/***************************************************************
 * function: validateAll
 * description: validates statement and all its parents in
 *              given array (sets each statement[VAL] to true)
 * parameters:
 *   -index: integer, statement to begin validation with
 *   -arr: array, to validate statements in
 * return: null
 *
 ***************************************************************/
function validateAll(index, arr){

  // validates current index
  arr[index][VAL] = true;

  /* terminating condition:
   *   level of statement is 0
   */
  if (arr[index][LEVEL] == 0){
    return;
  }

  // calls validateAll on parent of current statement
  var parIndex = getParent(arr[index][LEVEL], index, arr);
  validateAll(parIndex, arr);
}

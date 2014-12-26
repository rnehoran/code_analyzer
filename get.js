/*-------------------------------------------------------------
 * file: get.js
 * description: getters for all functions in project
 * content: getParent(), getSibling(), getChild(),
 *          getNextInLevel(), getFirstInLevel(), getName(),
 *          getLongestPath()
 * created by: Roy Nehoran
 -------------------------------------------------------------*/


/***************************************************************
 * function: getParent
 * description: gets parent of indicated statement in array
 * parameters:
 *   -level: integer, level of current (child) statement
 *   -index: integer, index of current (child) statement
 *   -arr: array, containing child and parent
 * return: integer, index of parent statement
 *
 ***************************************************************/
function getParent(level, index, arr){

  /* loops up the array until:
   *   the level of a statement equals to
   *   the level of the original,
   *     minus one
   */
  for (var n = index - 1; n > -1; n--){
    if (arr[n][LEVEL] == level - 1){
      return n;
    }
  }
  return 0;
}

/***************************************************************
 * function: getSibling
 * description: finds else statement based on JSON object of
 *              if-statement
 * parameters:
 *   -syntax: JSON object, if-statement
 * return: JSON object, body of sibling (else) of if-statement
 *
 * NOTE: only returns body if it contains any children
 *
 ***************************************************************/
function getSibling(syntax){
  switch (syntax.alternate.type){
    case 'EmptyStatement':
      return null;
    case 'BlockStatement':
      if (syntax.alternate.body.length == 0){
        return null;
      }
      else {
        return syntax.alternate.body;
      }
  }
}

/***************************************************************
 * function: getChild
 * description: gives body of JSON object based on its type
 * parameters:
 *   -syntax: JSON object, parent object
 * return: JSON object, body of parent object
 *
 * NOTE: only returns body if it contains any children
 *
 ***************************************************************/
function getChild(syntax){
  switch (syntax.type){
    case 'WhileStatement':
      switch (syntax.body.type){
        case 'EmptyStatement':
          return null;
        case 'BlockStatement':
          if (syntax.body.body.length == 0){
            return null;
          }
          else {
            return syntax.body.body;
          }
      }
    case 'IfStatement':
      switch (syntax.consequent.type){
        case 'EmptyStatement':
          return null;
        case 'BlockStatement':
          if (syntax.consequent.body.length == 0){
            return null;
          }
          else {
            return syntax.consequent.body;
          }
      }
    case 'ForStatement':
      switch (syntax.body.type){
        case 'EmptyStatement':
          return null;
        case 'BlockStatement':
          if (syntax.body.body.length == 0){
            return null;
          }
          else {
            return syntax.body.body;
          }
      }
    case 'FunctionDeclaration':
      if (syntax.body.body.length == 0){
        return null;
      }
      else {
        return syntax.body.body;
      }
    default:
      return null;
  }
}

/***************************************************************
 * function: getNextInLevel
 * description: finds the next statement of same level in
 *              indicated array
 * parameters:
 *   -index: integer, index of starting statement in array
 *   -arr: array, of statements to probe
 * return: integer, index of found statement
 *
 * NOTE: returns -1 if not found
 *
 ***************************************************************/
function getNextInLevel(index, arr){

  /* for each statement in array (after starting statement), check that:
   *   starting statement and current statement are on the same level
   *   current statement is not yet validated
   */
  for (var n = index + 1; n < arr.length; n++){
    if (arr[n][LEVEL] == arr[index][LEVEL] && !arr[n][VAL]){
      return n;
    }
  }
  return -1;
}

/***************************************************************
 * function: getFirstInLevel
 * description: finds the first statement of indicated level in
 *              indicated array
 * parameters:
 *   -level: integer, level of statement to find
 *   -arr: array, of statements to probe
 * return: integer, index of found statement
 *
 * NOTE: returns -1 if not found
 *
 ***************************************************************/
function getFirstInLevel(level, arr){

  /* for each statement in array, check that:
   *   current statement is on indicated level
   *   current statement is not yet validated
   */
  for (var n = 0; n < arr.length; n++){
    if (arr[n][LEVEL] == level && !arr[n][VAL]){
      return n;
    }
  }
  return -1;
}

/***************************************************************
 * function: getName
 * description: gives statement name based on JSON type
 * parameters:
 *   -type: String, JSON type
 * return: String, statement name
 *
 ***************************************************************/
function getName(type){
  switch (type){
    case 'WhileStatement':
      return 'while';
    case 'IfStatement':
      return 'if';
    case 'ForStatement':
      return 'for';
    case 'FunctionDeclaration':
      return 'function';
    case 'VariableDeclaration':
      return 'var';
    case 'ExpressionStatement':
      return 'expression';
  }
}

/***************************************************************
 * function: getLongestPath
 * description: gives the largest level in ruleArray
 * parameters: none
 * return: integer, largest level of rules in ruleArray
 *
 ***************************************************************/
function getLongestPath(){
  var longestPath = 0;

  // for every rule, checks if level is larger than current longestPath
  for (var x = 0; x < ruleArray.length; x++){
    if (ruleArray[x][LEVEL] > longestPath){
      longestPath = ruleArray[x][LEVEL];
    }
  }
  return longestPath;
}

/*-------------------------------------------------------------
 * file: parse.js
 * description: parse code and organize it into an array
 * content: parse(), expand()
 * created by: Roy Nehoran
 -------------------------------------------------------------*/


/***************************************************************
 * function: parse
 * description: performs parse by Esprima parser,
 *              calls recursive expand() on parsed string and
 *              codeArray
 * parameters: none
 * return: null
 *
 ***************************************************************/
function parse(){
  var syntax = esprima.parse(editor.getValue());
  codeArray = [];
  expand(syntax.body, codeArray, 0);
}

/***************************************************************
 * function: expand
 * description: recursively adds JSON elements to codeArray
 * parameters:
 *   -syntax: JSON object, contains all elements in entered code
 *   -codeArray: array, empty array to fill with code elements
 *   -level: integer, level of statement to insert into codeArray,
 *           and to perform recursion on
 * return: null
 *
 ***************************************************************/
function expand(syntax, codeArray, level){

  /* terminating condition:
   *   no children statements to JSON object
   */
  if (syntax == null){
    return;
  }
  for (var w = 0; w < syntax.length; w++){

    /* adds each statement to array,
     * gets statement name with getName()
     * calls expand() on statement body to find children,
     *   adds 1 to level each time
     */
    codeArray.push([getName(syntax[w].type), level, w, false]);
    expand(getChild(syntax[w]), codeArray, level + 1);

    // if if-statement, perform the same on else statement
    if (syntax[w].type == 'IfStatement' && syntax[w].alternate != null){
      codeArray.push(['else', level, w, false]);
      expand(getSibling(syntax[w]), codeArray, level + 1);
    }
  }
}

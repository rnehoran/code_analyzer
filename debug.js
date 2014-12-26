/*-------------------------------------------------------------
 * file: debug.js
 * description: provides tools for debugging
 * content: debug()
 * created by: Roy Nehoran
 -------------------------------------------------------------*/


/***************************************************************
 * function: debug
 * description: displays object in debug area (under editor)
 * parameters:
 *   -string: object, to be shown in the form of a string
 *   -erase: boolean, whether to erase previously inserted
 *           objects into debug area
 * return: null
 *
 ***************************************************************/
function debug(string, erase){

  // if indicated, erase current content of debug area
  if (erase){
    var element = document.getElementById('debug');
    element.innerHTML = string;
  }
  else {
    var element = document.getElementById('debug');
    element.innerHTML += "<br><br>" + string;
  }
}

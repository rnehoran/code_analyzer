/*-------------------------------------------------------------
 * file: global.js
 * description: initializes all global variables
 * content: ruleArray, blackList, codeArray, NAME, LEVEL,
 *          LIST_ORDER, VAL
 * created by: Roy Nehoran
 -------------------------------------------------------------*/


/* ruleArray and blackList:
 *   stores array of rules in format:
 *     -rule name
 *     -level
 *     -list that the rule belongs to:
 *       ~ white: required code - 0
 *       ~ preferred: optional code - 1
 *       ~ black: forbidden code - 2
 *     -validated - starts as false
 */
var ruleArray = [['function', 0, 0, false],
                 ['if', 1, 0, false],
                   ['if', 2, 0, false],
                   ['else', 2, 2, false],
               ['if', 0, 0, false],
                 ['var', 1, 0, false],
                 ['expression', 1, 2, false]];
var blackList = [['while', 0, 1, false],
               ['for', 0, 1, false]];

/* codeArray:
 *   stores array of statements from user-entered code
 *   in format:
 *     -statement name
 *     -level
 *     -order within all statements in level
 *     -validated - starts as false
 */
var codeArray = [];

/* final integers for probing arrays:
 *   -NAME: points to string, rule/code statement name
 *   -LEVEL: points to integer, statement hierarchy
 *   -LIST_ORDER: points to integer,
 *     ~ list for ruleArray and blackList
 *     ~ order in level for codeArray
 *   -VAL: points to boolean, validated
 */
var NAME = 0;
var LEVEL = 1;
var LIST_ORDER = 2;
var VAL = 3;

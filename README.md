Code_Analyzer
=============
This project takes in code that is entered in a code editor, and compares it to hard-coded rules in the javascript.
The main web page, code_analyzer.html, contains an Ace code editor on the left and dynamic rule graphics on the right.

The Ace code editor checks the code for syntax errors, and the code is only validated if it contains none of these errors.

The rule graphics on the right of the code editor are organized according to list.
The white list is a list of code statements in green that have to be entered in the text area.
The preferred list is code statements in blue that are optional and do not affect validation of the code as a whole.
The black list is a list of statements in red that are forbidden in a user's code.
The rules are shown with indentation to indicate the hierarchy in which they are searched for.

The Esprima Parser is used to provide a JSON object of the code from which an array is created containing each code statement.
From there an algorithm is used to match code statements to the rules and show it to the user.
The algorithm begins with the lowest hierarchy rule and checks up from it, making sure to always find the best-fitting rule for every code statement.

When the entered code has all of the required (white list) code, and none of the forbidden (black list) code, the page heading turns into a green from its usual purple color.

The code is run from code_analyzer.html, which calls all of the javascript files needed.
The descriptions and functions of each javascript module are documented at the top of each file.

The code rules can be edited in the global.js file, ruleArray for the white and preferred lists, and blackList for the black list.

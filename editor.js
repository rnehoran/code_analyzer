/*-------------------------------------------------------------
 * file: editor.js
 * description: initializes editor and its functions
 * created by: Roy Nehoran
 -------------------------------------------------------------*/


/* utilize editor:
 *   initialize
 *   add select-all command
 *   add submit command
 */
var editor = ace.edit('editor');
editor.setTheme('ace/theme/katzenmilch');
editor.getSession().setMode('ace/mode/javascript');

editor.commands.addCommand({
  name: 'selectAll',
  bindKey: {win: 'Ctrl-A',  mac: 'Command-A'},
  exec: function(editor) {
      editor.session.setTextRange(editor.session.getLength());
  },
  readOnly: true
});

editor.commands.addCommand({
  name: 'submit',
  bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
  exec: function() {
    clearAndTest();
  },
  readOnly: true
});

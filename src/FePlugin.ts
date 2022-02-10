import vscode = require('vscode');

export default class FePlugin {
  constructor(
    private ctx: vscode.ExtensionContext
  ) {
    this.commandHandle();
  }

  private commandHandle() {
    this.ctx.subscriptions.push(
      vscode.commands.registerCommand('fePlugin.viewMore', () => {
        vscode.window.showInformationMessage('Clicked Front end plugin [View More].');
      })
    );
  }

  dispose() {

  }
}

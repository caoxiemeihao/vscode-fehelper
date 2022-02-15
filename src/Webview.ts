import vscode = require('vscode');
import path = require('path');
import Helper from './Helper';
import { Plugin } from './mock';

export default class Webview {
  private plugin = {} as Plugin;
  private panel: vscode.WebviewPanel;

  constructor(
    private ctx: vscode.ExtensionContext,
  ) {
    this.panel = vscode.window.createWebviewPanel(
      'fePluginWebview',
      'Front end helper',
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
      }
    );
  }

  setPlugin(plugin: Plugin) {
    this.plugin = plugin;
    this.renderSkeleton();
    this.renderHtml();
  }

  private renderSkeleton() {
    this.panel.webview.html = this.plugin.skeleton;
  }

  private renderHtml() {
    try {
      const html = Helper.readFile(Helper.rootResolve(this.plugin.link));
      this.plugin.html = html;
      this.panel.webview.html = html;

      // Handle messages from the webview
      this.panel.webview.onDidReceiveMessage(
        message => {
          switch (message.command) {
            case 'package.json':
              const json = Helper.readFile(path.join(vscode.workspace.rootPath as string, 'package.json'));

              // Send a message to our webview.
              // You can send any JSON serializable data.
              this.panel.webview.postMessage({ command: 'package.json', payload: JSON.parse(json) });
              break;
          }
        },
        undefined,
        this.ctx.subscriptions,
      );
    } catch (error) {
      this.panel.webview.html = `<pre>${error}</pre>`;
      console.error(error);
    }
  }

  dispose() {
    this.panel?.dispose();
  }
}
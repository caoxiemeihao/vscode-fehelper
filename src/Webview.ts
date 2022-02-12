import vscode = require('vscode');
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
    const html = this.plugin.html;
    this.plugin = plugin;
    if (html) { // use html cache
      this.panel.webview.html = html;
      this.plugin.html = html;
    } else {
      this.renderSkeleton();
      this.renderHtml();
    }
  }

  private renderSkeleton() {
    this.panel.webview.html = this.plugin.html;
  }

  private async renderHtml() {
    try {
      const html = await Helper.get(this.plugin.link);
      this.plugin.html = html;
      this.panel.webview.html = html;
    } catch (error) {
      this.panel.webview.html = `<pre>${error}</pre>`;
      console.error(error);
    }
  }

  dispose() {
    this.panel?.dispose();
  }
}
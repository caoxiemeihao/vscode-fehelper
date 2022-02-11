import vscode = require('vscode');
import { Plugin } from './mock';

export default class Webview {
  private plugin!: Plugin;
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
    this.renderHtml();
    this.renderLink();
  }

  private renderHtml() {
    this.panel.webview.html = this.plugin.html;
  }

  private renderLink() {
    
  }

  dispose() {
    this.panel?.dispose();
  }
}
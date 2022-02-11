import vscode = require('vscode');
import path = require('path');
import { plugins, Plugin } from './mock';

// like static class
export module FePluginTree {
  export function createTreeView(fePlugin: FePlugin) {
    const treeView = vscode.window.createTreeView('fePlugin', { treeDataProvider: fePlugin });

    treeView.onDidChangeSelection(async item => {
      const plugin = plugins.find(c => c.label === item.selection[0].label) || {} as Plugin;
      vscode.window.showInformationMessage(`[onDidChangeSelection] (${plugin.label})`);
    });
    treeView.onDidChangeVisibility(() => {
      vscode.window.showInformationMessage(`[onDidChangeVisibility] (${treeView.visible})`);
    });
    treeView.onDidCollapseElement(() => {
      vscode.window.showInformationMessage('[onDidCollapseElement]');
    });
    treeView.onDidExpandElement(() => {
      vscode.window.showInformationMessage('[onDidExpandElement]');
    });

    return treeView;
  }
}

export class FePlugin implements vscode.TreeDataProvider<PluginItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<void | PluginItem | null | undefined>();

  // like network request
  children = new Promise<PluginItem[]>(resolve => {
    setTimeout(() => {
      vscode.window.showInformationMessage('+++++++++');
      resolve(plugins.map(plugin => new PluginItem(
        plugin.label,
        plugin.desc,
        plugin.version,
        plugin.icon,
      )));
    }, 1000 * 1.5);
  });

  constructor(
    private ctx?: vscode.ExtensionContext,
  ) {
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  // ---- impl ----
  onDidChangeTreeData?: vscode.Event<void | PluginItem | null | undefined> | undefined;
  getTreeItem(element: PluginItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    console.log('---- getTreeItem ----', element); // step-2: tree item, from step-1
    return element;
  }
  getChildren(element?: PluginItem): Thenable<PluginItem[]> {
    console.log('---- getChildren ----', element); // step-1: tree list
    return this.children;
  }
  // ---- impl ----
}

class PluginItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private desc: string,
    private version: string,
    private icon: string,
    public readonly collapsibleState = vscode.TreeItemCollapsibleState.None,
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}-${this.version}`;
    this.description = this.desc;

    this.iconPath = path.join(__filename, '..', '..', this.icon);
  }
}

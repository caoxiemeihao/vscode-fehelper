import vscode = require('vscode');
import path = require('path');

// like static class
export module FePluginTree {
  export function createTreeView(fePlugin: FePlugin) {
    const treeView = vscode.window.createTreeView('fePlugin', { treeDataProvider: fePlugin });

    treeView.onDidChangeSelection(item => {
      vscode.window.showInformationMessage(`[onDidChangeSelection] (${item.selection[0].label})`);
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

  constructor(
    private ctx?: vscode.ExtensionContext,
  ) {
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  // ---- impl ----
  onDidChangeTreeData?: vscode.Event<void | PluginItem | null | undefined> | undefined;
  getTreeItem(element: PluginItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  getChildren(element?: PluginItem): vscode.ProviderResult<PluginItem[]> {
    return [
      new PluginItem(
        'Vite⚡️Vue',
        'One click integration Vite',
        '0.1.1',
        'resources/vite.svg',
        vscode.TreeItemCollapsibleState.None,
        ),
        new PluginItem(
          'Npm',
          'Dependencies manager',
          '0.1.1',
          'resources/npm.svg',
        vscode.TreeItemCollapsibleState.None,
      ),

    ];
  }
  // ---- impl ----
}

class PluginItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private desc: string,
    private version: string,
    private icon: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}-${this.version}`;
    this.description = this.desc;

    this.iconPath = path.join(__filename, '..', '..', this.icon);
  }
}

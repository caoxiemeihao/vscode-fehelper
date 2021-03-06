// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FePlugin, FePluginTree } from './FePlugin';
import { NodeDependenciesProvider } from './NodeDependenciesProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// vscode.window.setStatusBarMessage('The method(activate) of [vscode-fehelper] extension has executed.');
	vscode.window.showInformationMessage('The method(activate) of [vscode-fehelper] extension has executed.');

	// ---------------------------------------------------------------------------

	// official demo
	vscode.window.registerTreeDataProvider(
		'nodeDependencies',
		// @ts-ignore
		new NodeDependenciesProvider(vscode.workspace.rootPath)
	);
	vscode.window.createTreeView('nodeDependencies', {
		// @ts-ignore
		treeDataProvider: new NodeDependenciesProvider(vscode.workspace.rootPath)
	});
	// @ts-ignore
	const nodeDependenciesProvider = new NodeDependenciesProvider(vscode.workspace.rootPath);
	vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
	vscode.commands.registerCommand('nodeDependencies.refreshEntry', () =>
		nodeDependenciesProvider.refresh()
	);

	// ---------------------------------------------------------------------------

	context.subscriptions.push(
		// for Welcome panel
		vscode.commands.registerCommand('fePlugin.viewMore', () => {
			vscode.window.showInformationMessage('Clicked Front end plugin [View More].');
		}),
	);

	context.subscriptions.push(
		FePluginTree.createTreeView(new FePlugin(context)),
	);

	// ---------------------------------------------------------------------------

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-fe-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-fe-helper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vscode-fe-helper!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


	document.addEventListener('DOMContentLoaded', function() {
		const preElement = document.querySelector('#mc pre');
		if (!preElement) return;
		
		// 获取代码并转义HTML字符
		let code = preElement.textContent;
		code = escapeHtml(code);
		
		// 按顺序应用语法高亮
		code = highlightComments(code);
		code = highlightPreprocessor(code);
		code = highlightStrings(code);
		code = highlightNumbers(code);
		code = highlightRaylibFunctions(code);
		code = highlightFunctions(code);
		code = highlightKeywords(code);
		code = highlightTypes(code);
		
		preElement.innerHTML = code;
	});
	
	// 转义HTML特殊字符，防止XSS
	function escapeHtml(text) {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}
	
	// 高亮注释（多行和单行）
	function highlightComments(code) {
		code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>');
		code = code.replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>');
		return code;
	}
	
	// 高亮预处理器指令
	function highlightPreprocessor(code) {
		return code.replace(/^(#include\s+[<"][^>"]+[>"])/gm, '<span class="code-preprocessor">$1</span>');
	}
	
	// 高亮字符串
	function highlightStrings(code) {
		return code.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="code-string">$&</span>');
	}
	
	// 高亮数字
	function highlightNumbers(code) {
		return code.replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>');
	}
	
	// 高亮Raylib核心函数
	function highlightRaylibFunctions(code) {
		const functions = [
			'InitWindow', 'CloseWindow', 'WindowShouldClose', 'BeginDrawing', 
			'EndDrawing', 'ClearBackground', 'DrawText', 'SetTargetFPS',
			'IsWindowReady', 'GetScreenWidth', 'GetScreenHeight',
			'GetMousePosition', 'IsMouseButtonPressed', 'IsKeyPressed',
			'LoadTexture', 'DrawTexture', 'DrawRectangle', 'DrawCircle',
			'SetConfigFlags', 'ToggleFullscreen', 'LoadModel', 'DrawModel'
		];
		
		const pattern = new RegExp('\\b(' + functions.join('|') + ')\\b(?=\\s*\\()', 'g');
		return code.replace(pattern, '<span class="code-raylib-core">$1</span>');
	}
	
	// 高亮普通函数调用
	function highlightFunctions(code) {
		return code.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, function(match, name) {
			if (match.includes('<span')) return match;  // 已经被高亮就跳过
			return '<span class="code-function">' + name + '</span>';
		});
	}
	
	// 高亮C语言关键字
	function highlightKeywords(code) {
		const keywords = [
			'int', 'void', 'char', 'float', 'double', 'bool', 'const', 
			'static', 'unsigned', 'signed', 'short', 'long', 'enum', 'struct',
			'if', 'else', 'while', 'for', 'do', 'switch', 'case', 'default',
			'break', 'continue', 'return', 'goto', 'sizeof', 'typedef'
		];
		
		const pattern = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g');
		return code.replace(pattern, function(match) {
			if (match.includes('<span')) return match;
			return '<span class="code-keyword">' + match + '</span>';
		});
	}
	
	// 高亮数据类型和常量
	function highlightTypes(code) {
		const types = [
			'RAYWHITE', 'LIGHTGRAY', 'WHITE', 'BLACK', 'RED', 
			'Color', 'Vector2', 'Vector3', 'Rectangle', 'Texture2D', 
			'Model', 'Shader', 'Camera3D', 'Camera2D'
		];
		
		const pattern = new RegExp('\\b(' + types.join('|') + ')\\b', 'g');
		return code.replace(pattern, function(match) {
			if (match.includes('<span')) return match;
			return '<span class="code-type">' + match + '</span>';
		});
	}

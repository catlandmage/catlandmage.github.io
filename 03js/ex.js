// 加载公共组件
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        });
}

// 加载头部、底部等公共部分
window.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', '/components/../index.html');
    loadComponent('footer', '/components/footer.html');
    loadComponent('sidebar', '/components/sidebar.html');
});
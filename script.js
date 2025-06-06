let isHidden = false;
let lastTheme = null;

window.hideAllExceptBg = function() {
    try {
        const container = document.querySelector('.container');
        const hideToggleBtn = document.querySelector('.control-menu');
        const html = document.documentElement;
        
        isHidden = !isHidden;
        
        if (isHidden) {
            // 保存当前主题
            lastTheme = html.getAttribute('data-theme');
            // 强制切换到亮色模式
            html.setAttribute('data-theme', 'light');
            container.style.opacity = '0';
            container.style.pointerEvents = 'none';
            hideToggleBtn.style.opacity = '0.3';
            document.querySelector('.popup-menu button:nth-child(2) i').className = 'fas fa-eye-slash';
        } else {
            // 恢复之前的主题
            if (lastTheme) {
                html.setAttribute('data-theme', lastTheme);
                localStorage.setItem('theme', lastTheme);
            }
            container.style.opacity = '1';
            container.style.pointerEvents = 'auto';
            hideToggleBtn.style.opacity = '1';
            document.querySelector('.popup-menu button:nth-child(2) i').className = 'fas fa-eye';
        }
    } catch (error) {
        console.error('Error in hideAllExceptBg:', error);
    }
}

window.toggleTheme = function() {
    if (isHidden) return; // 如果界面隐藏，不允许切换主题
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// 在页面加载时初始化主题
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

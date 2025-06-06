/**
 * 全局状态变量
 */
let isHidden = false; // 控制界面显示/隐藏状态
let lastTheme = null; // 记录上一次的主题设置

/**
 * 界面显示/隐藏控制函数
 * 处理界面透明度、交互状态和主题切换
 */
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

/**
 * 主题切换函数
 * 在明暗主题间切换并保存状态到localStorage
 */
window.toggleTheme = function() {
    if (isHidden) return; // 如果界面隐藏，不允许切换主题
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

/**
 * 页面加载初始化
 * 从localStorage读取并应用保存的主题设置
 */
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// RGB随机颜色生成函数
function randomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

// 添加点击生成喵字的效果
document.addEventListener('click', function(event) {
    const text = document.createElement('span');
    text.className = 'click-text';
    text.textContent = ['喵~', '喵喵', '喵喵喵'][Math.floor(Math.random() * 3)];
    
    text.style.left = (event.clientX - 15) + 'px';
    text.style.top = (event.clientY - 15) + 'px';
    text.style.color = randomRGBColor();
    
    const randomRotation = Math.random() * 30 - 15;
    text.style.transform = `rotate(${randomRotation}deg)`;
    
    document.body.appendChild(text);
    
    text.addEventListener('animationend', () => {
        text.remove();
    });
});

function createSakura() {
    const sakura = document.createElement('div');
    const size = Math.random() * 15 + 10; // 10-25px随机大小
    
    sakura.className = 'sakura';
    sakura.style.left = Math.random() * 50 - 10 + 'vw'; // 从左侧更大范围生成
    sakura.style.width = size + 'px';
    sakura.style.height = size + 'px';
    sakura.style.animationDuration = Math.random() * 4 + 3 + 's';
    sakura.style.opacity = Math.random() * 0.6 + 0.2;
    document.body.appendChild(sakura);

    setTimeout(() => {
        sakura.remove();
    }, 8000);
}

setInterval(createSakura, 100); // 增加生成频率

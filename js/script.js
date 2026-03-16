document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // 为每个按钮创建预览涟漪元素（跟随鼠标的静态圆点）
        const preview = document.createElement('span');
        preview.className = 'ripple-preview';
        preview.style.opacity = '0';   // 默认隐藏
        button.appendChild(preview);

        // 在按钮对象上存储预览元素和最后鼠标坐标
        button._preview = preview;
        button._lastX = 0;
        button._lastY = 0;

        // --- 鼠标进入按钮：根据进入点显示预览 ---
        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button._lastX = x;
            button._lastY = y;
            preview.style.left = x + 'px';
            preview.style.top = y + 'px';
            preview.style.opacity = '1';
        });

        // --- 鼠标在按钮内移动：更新预览位置 ---
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button._lastX = x;
            button._lastY = y;
            preview.style.left = x + 'px';
            preview.style.top = y + 'px';
            // 如果预览没有被点击隐藏，保持显示
            if (preview.style.opacity !== '0') {
                preview.style.opacity = '1';
            }
        });

        // --- 鼠标离开按钮：隐藏预览 ---
        button.addEventListener('mouseleave', () => {
            preview.style.opacity = '0';
        });

        // --- 点击事件 ---
        button.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认跳转

            // 1. 隐藏预览
            if (button._preview) {
                button._preview.style.opacity = '0';
            }

            // 2. 创建并播放点击涟漪
            createRipple(event, button);

            // 3. 获取链接并决定行为
            const href = button.getAttribute('href');

            // 如果是“支持我们”按钮，弹出通知，不跳转
            if (button.id === 'btn-support') {
                alert('赞助请前往对应服务器的官网');
                // 涟漪动画结束后恢复预览（如果鼠标仍在按钮上）
                setTimeout(() => {
                    if (button.matches(':hover') && button._preview) {
                        button._preview.style.left = button._lastX + 'px';
                        button._preview.style.top = button._lastY + 'px';
                        button._preview.style.opacity = '1';
                    }
                }, 600);
                return; // 不执行后续跳转逻辑
            }

            // 其他按钮：保留原有跳转逻辑
            if (href && href !== '#') {
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });

    /**
     * 创建涟漪元素（在所有按钮循环外部定义）
     */
    function createRipple(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        btn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

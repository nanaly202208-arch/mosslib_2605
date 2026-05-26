let currentNotification = null;
let simulationTimer = null;

function renderSentinelDropdown(items) {
    const dropdown = document.getElementById('sentinelDropdown');
    if (!dropdown) return;
    if (!items || items.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-empty">暂无哨兵消息</div>';
        return;
    }
    dropdown.innerHTML = `
    <div class="dropdown-header">
        <span>AI 哨兵</span>
        <div style="display: flex; gap: 8px;">
            <span id="pinSentinelBtn" style="cursor: pointer; font-size: 14px;" title="固定为悬浮窗">📌</span>
            <a href="#" id="viewAllSentinel">全部 →</a>
        </div>
    </div>
    ${items.map(item => `
        <div class="sentinel-dropdown-item" data-type="${item.type}" data-id="${item.id}">
            <div class="item-title">${item.label}</div>
            <div class="item-desc">${item.desc}</div>
            <div class="item-time">${item.time}</div>
        </div>
    `).join('')}
`;

    const pinBtn = dropdown.querySelector('#pinSentinelBtn');
    if (pinBtn) {
        pinBtn.addEventListener('click', () => {
            dropdown.classList.add('sentinel-fixed');
            dropdown.classList.remove('show');
            if (!dropdown.querySelector('.unpin-btn')) {
                const header = dropdown.querySelector('.dropdown-header');
                const unpin = document.createElement('span');
                unpin.innerHTML = '✕';
                unpin.className = 'unpin-btn';
                unpin.style.cursor = 'pointer';
                unpin.style.marginLeft = '8px';
                unpin.title = '取消固定';
                unpin.addEventListener('click', () => {
                    dropdown.classList.remove('sentinel-fixed');
                    dropdown.classList.remove('show');
                });
                header.querySelector('div').appendChild(unpin);
            }
        });
    }

    const viewAll = dropdown.querySelector('#viewAllSentinel');
    if (viewAll) {
        viewAll.addEventListener('click', (e) => {
            e.preventDefault();
            alert('哨兵详情页开发中，将展示完整预警列表。');
        });
    }
}

function showNewMessageNotification(msg) {
    if (currentNotification && document.body.contains(currentNotification)) {
        closeNotificationImmediately(currentNotification);
    }

    let autoTimer = null;

    function closeNotification(element) {
        if (autoTimer) clearTimeout(autoTimer);
        element.classList.remove('show');
        setTimeout(() => {
            if (element.parentNode) element.remove();
            if (currentNotification === element) currentNotification = null;
        }, 300);
    }

    function closeNotificationImmediately(element) {
        if (autoTimer) clearTimeout(autoTimer);
        element.classList.remove('show');
        if (element.parentNode) element.remove();
        if (currentNotification === element) currentNotification = null;
    }

    const notif = document.createElement('div');
    notif.className = 'sentinel-notification';
    notif.dataset.msgId = msg.id;
    notif.innerHTML = `
        <div class="notif-content">
            <div class="notif-title">
                AI 哨兵
                <span class="notif-time" style="margin-left: 8px; font-weight: normal;">${msg.time}</span>
            </div>
            <div class="notif-desc">${msg.label}：${msg.desc.substring(0, 80)}${msg.desc.length > 80 ? '…' : ''}</div>
        </div>
        <div class="notif-close">✕</div>
    `;
    document.body.appendChild(notif);
    currentNotification = notif;

    setTimeout(() => notif.classList.add('show'), 10);

    const closeBtn = notif.querySelector('.notif-close');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeNotification(notif);
    });

    autoTimer = setTimeout(() => {
        closeNotification(notif);
    }, 30000);

    notif.addEventListener('mouseenter', () => {
        if (autoTimer) {
            clearTimeout(autoTimer);
            autoTimer = null;
        }
    });

    notif.addEventListener('mouseleave', () => {
        if (!autoTimer && document.body.contains(notif)) {
            autoTimer = setTimeout(() => {
                closeNotification(notif);
            }, 30000);
        }
    });

    notif.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target.classList.contains('notif-close')) return;
        const dropdown = document.getElementById('sentinelDropdown');
        if (dropdown) {
            dropdown.classList.add('show');
        }
        setTimeout(() => {
            const targetItem = dropdown.querySelector(`.sentinel-dropdown-item[data-id="${msg.id}"]`);
            if (targetItem) {
                targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetItem.style.backgroundColor = 'var(--primary-light)';
                setTimeout(() => { targetItem.style.backgroundColor = ''; }, 2000);
            } else {
                const items = dropdown.querySelectorAll('.sentinel-dropdown-item');
                for (let item of items) {
                    const descSpan = item.querySelector('.item-desc');
                    if (descSpan && descSpan.innerText.includes(msg.desc.substring(0, 40))) {
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        item.style.backgroundColor = 'var(--primary-light)';
                        setTimeout(() => { item.style.backgroundColor = ''; }, 2000);
                        break;
                    }
                }
            }
        }, 150);
        closeNotification(notif);
    });
}

function getRandomDelay() {
    return Math.floor(Math.random() * (10000 - 3000 + 1) + 3000);
}

function generateMockSentinel() {
    const types = ['alert', 'info', 'tip'];
    const labels = ['🔥 实时监控', '📡 智能扫描', '💡 线索发现', '⚠️ 系统预警', '📊 数据波动'];
    const type = types[Math.floor(Math.random() * types.length)];
    const label = labels[Math.floor(Math.random() * labels.length)];
    const desc = `模拟高价值线索：${Math.random().toString(36).substring(2, 10)}... 请及时研判。`;
    return {
        id: Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        type: type,
        label: label,
        desc: desc,
        time: new Date().toLocaleTimeString() + ' · 模拟系统'
    };
}

function scheduleRandomMessage() {
    const delay = getRandomDelay();
    simulationTimer = setTimeout(() => {
        const config = roleConfig[currentRole];
        if (config && config.sentinel) {
            const newMsg = generateMockSentinel();
            config.sentinel.unshift(newMsg);
            if (config.sentinel.length > 10) config.sentinel.pop();
            renderSentinelDropdown(config.sentinel);
            showNewMessageNotification(newMsg);
            const sentinelUnread = config.sentinel.filter(s => s.type === 'alert').length;
            document.getElementById('sentinelCount').innerText = sentinelUnread;
        }
        scheduleRandomMessage();
    }, delay);
}

function startRandomSimulation() {
    if (simulationTimer) clearTimeout(simulationTimer);
    scheduleRandomMessage();
}

function stopRandomSimulation() {
    if (simulationTimer) {
        clearTimeout(simulationTimer);
        simulationTimer = null;
    }
}

function toggleSentinelPanel(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('sentinelDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}
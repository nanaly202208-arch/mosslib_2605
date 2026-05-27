function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');

    const logoImg = document.getElementById('brandLogo');
    if (sidebar.classList.contains('collapsed')) {
        logoImg.src = 'https://nanaly.oss-cn-beijing.aliyuncs.com/mosslib-v2/img/logo_M.png';
    } else {
        logoImg.src = 'https://nanaly.oss-cn-beijing.aliyuncs.com/mosslib-v2/img/logo_00.png';
    }
}

function switchRole(role, event) {
    const fixedDropdown = document.getElementById('sentinelDropdown');
    if (fixedDropdown) fixedDropdown.classList.remove('sentinel-fixed');
    event.stopPropagation();
    currentRole = role;
    const config = roleConfig[role];

    document.getElementById('sidebarAvatar').textContent = config.avatar;
    document.getElementById('sidebarRole').textContent = config.name;

    document.querySelectorAll('.role-option').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const todoList = document.getElementById('todoListRight');
    todoList.innerHTML = config.todo.map(t => `
    <div class="todo-item-compact">
        <div class="todo-dot ${t.priority}"></div>
        <div class="todo-body">
            <div class="todo-title-compact">${t.title}</div>
            <div class="todo-meta-compact">
                <span>${t.meta}</span>
                <span class="todo-tag-compact">${t.tag}</span>
                <span class="todo-type-compact">${t.type || '通用'}</span>
            </div>
        </div>
    </div>
`).join('');

    const todoCount = config.todo.length;
    document.getElementById('todoCount').innerText = todoCount;
    document.getElementById('todoCountSpan').innerText = todoCount;

    const sentinelUnread = config.sentinel.filter(s => s.type === 'alert').length;
    document.getElementById('sentinelCount').innerText = sentinelUnread;

    renderSentinelDropdown(config.sentinel);

    document.getElementById('chatMessages').classList.add('hidden');
    document.getElementById('chatMessages').innerHTML = '';

    document.getElementById('roleDropdown').classList.remove('active');
    document.getElementById('profileCard').classList.remove('active');
}

function toggleRoleDropdown() {
    document.getElementById('roleDropdown').classList.toggle('active');
    document.getElementById('profileCard').classList.toggle('active');
}

function navigate(pageId) {
    const newPages = ['topic-lib', 'clue-pool', 'internal-data', 'external-data', 'team-mgmt', 'term-mgmt', 'category-mgmt', 'user-mgmt'];
    if (newPages.includes(pageId)) {
        alert(`「${pageId}」页面功能开发中，敬请期待。`);
        return;
    }
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navMap = {
        'workspace': 0, 'creation': 1, 'translation': 2,
        'intelligence': 3, 'research': 4, 'topic-lib': 5, 'clue-pool': 6,
        'agents': 7, 'compute': 8, 'internal-data': 9, 'external-data': 10,
        'user-mgmt': 11, 'team-mgmt': 12, 'term-mgmt': 13, 'category-mgmt': 14
    };
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems[navMap[pageId]]) {
        navItems[navMap[pageId]].classList.add('active');
    }
}

function focusAiInput() {
    document.getElementById('mainChatInput').focus();
}

function sendAgentPrompt(prompt) {
    const input = document.getElementById('mainChatInput');
    input.value = prompt;
    sendMainChat();
}

function handleCollect(event, id) {
    event.stopPropagation();
    alert(`收藏内容 ID: ${id}`);
}

function handleAIRead(event, id, title) {
    event.stopPropagation();
    sendAgentPrompt(`解读：${title}`);
}

function handleMore(event, id) {
    event.stopPropagation();
    alert(`更多操作（分享、引用等） ID: ${id}`);
}

function sendMainChat() {
    const input = document.getElementById('mainChatInput');
    const text = input.value.trim();
    if (!text) return;

    const chatBody = document.getElementById('chatMessages');

    if (!chatBody.classList.contains('hidden') === false) {
        chatBody.classList.remove('hidden');
    }

    chatBody.innerHTML += `
        <div class="ai-message-row user">
            <div class="ai-avatar user">张</div>
            <div class="ai-bubble">${text}</div>
        </div>
    `;
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        chatBody.innerHTML += `
            <div class="ai-message-row">
                <div class="ai-avatar">✨</div>
                <div class="ai-bubble">
                    已为您启动 <strong>${text}</strong> 智能体...<<br><br>
                    作为${roleConfig[currentRole].name}，我已理解您的意图。正在调用相关模块和知识库进行处理，请稍候。<br><br>
                    <span style="color: var(--primary); font-weight: 700; cursor: pointer;" onclick="navigate('research')">→ 查看处理结果</span>
                </div>
            </div>
        `;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
}

const creationAgentPlaceholders = {
    'general': '你想写什么？描述你的创作需求，例如：帮我写一篇关于高超声速飞行器热防护材料的研究综述...',
    'proposal': '请输入开题报告主题，例如：可重复使用运载器热防护系统研究开题报告...',
    'research': '请输入研究报告主题，例如：2026年高超声速飞行器热防护材料进展分析...',
    'brief': '请输入情报简报主题，例如：2026年Q1低轨星座部署动态简报...',
    'translate': '请输入需要翻译的内容或上传文档，支持中英互译...',
    'ppt': '请输入PPT主题，例如：高超声速飞行器技术发展趋势汇报PPT...'
};

function selectCreationAgent(element, agentType) {
    document.querySelectorAll('.creation-agent-item').forEach(el => {
        el.classList.remove('active');
    });
    element.classList.add('active');

    const textarea = document.getElementById('creationInput');
    if (textarea && creationAgentPlaceholders[agentType]) {
        textarea.placeholder = creationAgentPlaceholders[agentType];
    }
}

function startCreation() {
    const input = document.getElementById('creationInput');
    const text = input.value.trim();
    const activeAgent = document.querySelector('.creation-agent-item.active');
    const agentType = activeAgent ? activeAgent.dataset.agent : 'general';
    const agentName = activeAgent ? activeAgent.querySelector('.creation-agent-name').textContent : '通用创作';

    if (!text) {
        input.focus();
        return;
    }

    alert(`已启动「${agentName}」智能体\n\n创作需求：${text.substring(0, 50)}${text.length > 50 ? '...' : ''}\n\n（写作页开发中，敬请期待）`);
}

function importLocalDocument() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.doc,.docx,.txt,.ppt,.pptx';
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            alert(`已选择文件：${file.name}\n文件大小：${(file.size / 1024).toFixed(1)} KB\n\n（文档导入功能开发中）`);
        }
    };
    fileInput.click();
}

function createBlankDocument() {
    alert('已创建空白文档\n\n（文档编辑器开发中，敬请期待）');
}

function uploadAttachment() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.doc,.docx,.txt,.ppt,.pptx,.pdf,.jpg,.jpeg,.png,.gif';
    fileInput.multiple = true;
    fileInput.onchange = function(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const fileNames = files.map(f => f.name).join(', ');
            alert(`已选择 ${files.length} 个文件：\n${fileNames.substring(0, 100)}${fileNames.length > 100 ? '...' : ''}\n\n（附件上传功能开发中）`);
        }
    };
    fileInput.click();
}

function toggleToolBtn(btn) {
    btn.classList.toggle('active');
}

function toggleDatasourceDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('datasourceDropdown');
    dropdown.classList.toggle('show');
}

function updateDatasourceSelection() {
    const checkboxes = document.querySelectorAll('#datasourceDropdown input[type="checkbox"]:checked');
    const selected = Array.from(checkboxes).map(cb => ({
        value: cb.value,
        name: cb.nextElementSibling.textContent.trim()
    }));

    const textEl = document.querySelector('.ai-datasource-text');
    const btn = document.getElementById('datasourceBtn');

    if (selected.length === 0) {
        textEl.textContent = '数据源';
        btn.classList.remove('active');
    } else if (selected.length <= 3) {
        textEl.textContent = selected.map(s => s.name).join('、');
        btn.classList.add('active');
    } else {
        const firstTwo = selected.slice(0, 2).map(s => s.name).join('、');
        textEl.textContent = `${firstTwo} +${selected.length - 2}`;
        btn.classList.add('active');
    }
}

document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('datasourceDropdown');
    const btn = document.getElementById('datasourceBtn');
    if (dropdown && btn && !btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

function updateCreationInputCount() {
    const textarea = document.getElementById('creationInput');
    const countEl = document.querySelector('.creation-input-count');
    if (!textarea || !countEl) return;

    const len = textarea.value.length;
    countEl.textContent = `${len}/500字`;
    if (len > 500) {
        countEl.style.color = 'var(--danger)';
    } else {
        countEl.style.color = 'var(--text-muted)';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const creationInput = document.getElementById('creationInput');
    if (creationInput) {
        creationInput.addEventListener('input', updateCreationInputCount);
    }
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.sidebar-footer')) {
        document.getElementById('roleDropdown').classList.remove('active');
        document.getElementById('profileCard').classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initRecommend();
    initBrief();

    const activeRoleOption = document.querySelector('.role-option.active');
    if (activeRoleOption) {
        switchRole(currentRole, { currentTarget: activeRoleOption, stopPropagation: () => {} });
    } else {
        switchRole(currentRole, { currentTarget: { classList: { add: () => {} } }, stopPropagation: () => {} });
    }

    const sentinelTrigger = document.getElementById('sentinelTrigger');
    const sentinelDropdown = document.getElementById('sentinelDropdown');

    if (sentinelTrigger && sentinelDropdown) {
        sentinelTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            if (sentinelDropdown.classList.contains('show')) {
                sentinelDropdown.classList.remove('show');
            } else {
                sentinelDropdown.classList.add('show');
            }
        });

        document.addEventListener('click', function(e) {
            if (!sentinelTrigger.contains(e.target) && !sentinelDropdown.contains(e.target)) {
                if (sentinelDropdown.classList.contains('show')) {
                    sentinelDropdown.classList.remove('show');
                }
            }
        });
    } else {
        console.error('哨兵元素未找到');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    startRandomSimulation();
});
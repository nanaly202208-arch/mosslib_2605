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
    if (event && event.stopPropagation) event.stopPropagation();
    currentRole = role;
    const config = roleConfig[role];

    const sidebarAvatar = document.getElementById('sidebarAvatar');
    const sidebarRole = document.getElementById('sidebarRole');
    if (sidebarAvatar) sidebarAvatar.textContent = config.avatar;
    if (sidebarRole) sidebarRole.textContent = config.name;

    document.querySelectorAll('.role-option').forEach(el => el.classList.remove('active'));
    if (event && event.currentTarget && event.currentTarget.classList) {
        event.currentTarget.classList.add('active');
    }

    const todoList = document.getElementById('todoListRight');
    if (todoList) {
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
    }

    const todoCount = config.todo.length;
    const todoCountEl = document.getElementById('todoCount');
    const todoCountSpanEl = document.getElementById('todoCountSpan');
    if (todoCountEl) todoCountEl.innerText = todoCount;
    if (todoCountSpanEl) todoCountSpanEl.innerText = todoCount;

    const sentinelUnread = config.sentinel.filter(s => s.type === 'alert').length;
    const sentinelCountEl = document.getElementById('sentinelCount');
    if (sentinelCountEl) sentinelCountEl.innerText = sentinelUnread;

    renderSentinelDropdown(config.sentinel);

    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.classList.add('hidden');
        chatMessages.innerHTML = '';
    }

    const roleDropdown = document.getElementById('roleDropdown');
    const profileCard = document.getElementById('profileCard');
    if (roleDropdown) roleDropdown.classList.remove('active');
    if (profileCard) profileCard.classList.remove('active');
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
    document.querySelectorAll('.nav-item').forEach(function(item) {
        var onclickAttr = item.getAttribute('onclick');
        if (onclickAttr && onclickAttr.indexOf("navigate('" + pageId + "')") !== -1) {
            item.classList.add('active');
        }
    });
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

    // 打开全屏对话页面
    openChatFullscreen(text);
    input.value = '';
}

function openChatFullscreen(initialText) {
    const fullscreen = document.getElementById('chatFullscreen');
    const messages = document.getElementById('chatFullscreenMessages');
    const content = document.querySelector('.content');

    if (!fullscreen) return;

    // 禁止content滚动
    if (content) {
        content.style.overflow = 'hidden';
    }

    // 显示全屏页面
    fullscreen.classList.add('active');

    // 清空旧消息
    messages.innerHTML = '';

    // 添加用户消息
    if (initialText) {
        addFullscreenMessage(initialText, 'user');
    }

    // 模拟AI回复
    setTimeout(() => {
        addFullscreenMessage(
            `已为您分析 <strong>「${initialText}」</strong><br><br>
            作为${roleConfig[currentRole].name}，我已基于MossLib库和选定数据源进行深度检索与分析。<br><br>
            <div style="margin-top:12px;">
                <div style="font-weight:700;margin-bottom:8px;">核心发现：</div>
                <ul style="padding-left:18px;margin:0;">
                    <li>检索到相关情报线索 23 条</li>
                    <li>涉及专题库：高超声速技术、低轨星座</li>
                    <li>置信度：高（85%）</li>
                </ul>
            </div>
            <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--border-light);">
                <span style="color: var(--primary); font-weight: 700; cursor: pointer;" onclick="navigate('research')">→ 查看完整分析报告</span>
            </div>`,
            'ai',
            `正在分析「${initialText}」相关问题...\n检索MossLib知识库及外部数据源...\n综合研判中...`
        );
    }, 800);
}

function backToWorkspace() {
    const fullscreen = document.getElementById('chatFullscreen');
    const content = document.querySelector('.content');

    if (fullscreen) {
        fullscreen.classList.remove('active');
    }

    // 恢复content滚动
    if (content) {
        content.style.overflow = '';
    }
}

function addFullscreenMessage(text, type, thinkContent) {
    const container = document.getElementById('chatFullscreenMessages');
    if (!container) return;

    const msgId = 'fs-msg-' + Date.now();

    let thinkHtml = '';
    if (type === 'ai' && thinkContent) {
        thinkHtml = `
            <div class="chat-think">
                <div class="chat-think-header" onclick="toggleThink(this)">
                    <i class="ri-arrow-down-s-line"></i>
                    <span>深度思考过程</span>
                </div>
                <div class="chat-think-body">${thinkContent.replace(/\n/g, '<br>')}</div>
            </div>
        `;
    }

    let avatarHtml;
    if (type === 'user') {
        avatarHtml = '张';
    } else {
        avatarHtml = '<img src="https://nanaly.oss-cn-beijing.aliyuncs.com/mosslib-v2/img/logo_M.png" alt="AI">';
    }

    container.innerHTML += `
        <div class="chat-msg ${type}" id="${msgId}">
            <div class="chat-msg-avatar ${type}">${avatarHtml}</div>
            <div>
                ${thinkHtml}
                <div class="chat-msg-content">${text}</div>
            </div>
        </div>
    `;

    container.scrollTop = container.scrollHeight;
}

function sendFullscreenMessage() {
    const input = document.getElementById('fullscreenInput');
    const text = input.value.trim();
    if (!text) return;

    addFullscreenMessage(text, 'user');
    input.value = '';

    setTimeout(() => {
        addFullscreenMessage(
            `收到您的追问：<strong>${text}</strong><br><br>
            正在基于上下文继续分析...`,
            'ai',
            `分析用户追问意图...\n关联上文上下文...\n生成回复...`
        );
    }, 600);
}

function addChatMessage(text, type, thinkContent) {
    const container = document.getElementById('chatDialogMessages');
    if (!container) return;

    const msgId = 'msg-' + Date.now();

    let thinkHtml = '';
    if (type === 'ai' && thinkContent) {
        thinkHtml = `
            <div class="chat-think">
                <div class="chat-think-header" onclick="toggleThink(this)">
                    <i class="ri-arrow-down-s-line"></i>
                    <span>深度思考过程</span>
                </div>
                <div class="chat-think-body">${thinkContent.replace(/\n/g, '<br>')}</div>
            </div>
        `;
    }

    const avatarText = type === 'user' ? '张' : '✨';

    container.innerHTML += `
        <div class="chat-msg ${type}" id="${msgId}">
            <div class="chat-msg-avatar ${type}">${avatarText}</div>
            <div>
                ${thinkHtml}
                <div class="chat-msg-content">${text}</div>
            </div>
        </div>
    `;

    container.scrollTop = container.scrollHeight;
}

function toggleThink(header) {
    header.classList.toggle('expanded');
    const body = header.nextElementSibling;
    if (body) {
        body.classList.toggle('show');
    }
}

function sendDialogMessage() {
    const input = document.getElementById('dialogInput');
    const text = input.value.trim();
    if (!text) return;

    addChatMessage(text, 'user');
    input.value = '';

    setTimeout(() => {
        addChatMessage(
            `收到您的追问：<strong>${text}</strong><br><br>
            正在基于上下文继续分析...`,
            'ai',
            `分析用户追问意图...\n关联上文上下文...\n生成回复...`
        );
    }, 600);
}

const creationAgentConfig = {
    'general': {
        title: 'AI 智能创作',
        icon: 'ri-sparkling-2-fill',
        placeholder: '你想写什么？描述你的创作需求，例如：帮我写一篇关于高超声速飞行器热防护材料的研究综述...',
        btnText: '开始创作',
        mode: 'normal'
    },
    'proposal': {
        title: '开题报告',
        icon: 'ri-file-list-3-line',
        placeholder: '请输入开题报告主题，例如：可重复使用运载器热防护系统研究开题报告...',
        btnText: '开始创作',
        mode: 'normal'
    },
    'research': {
        title: '研究报告',
        icon: 'ri-bar-chart-box-line',
        placeholder: '请输入研究报告主题，例如：2026年高超声速飞行器热防护材料进展分析...',
        btnText: '开始创作',
        mode: 'normal'
    },
    'brief': {
        title: '情报简报',
        icon: 'ri-newspaper-line',
        placeholder: '请输入情报简报主题，例如：2026年Q1低轨星座部署动态简报...',
        btnText: '开始创作',
        mode: 'normal'
    },
    'translate': {
        title: '象胥翻译',
        icon: 'ri-translate',
        placeholder: '提供专业准确的文本、图片、文档翻译能力',
        btnText: '开始翻译',
        mode: 'translate'
    },
    'ppt': {
        title: 'PPT 创作',
        icon: 'ri-slideshow-line',
        placeholder: '请输入PPT主题，例如：高超声速飞行器技术发展趋势汇报PPT...',
        btnText: '开始创作',
        mode: 'normal'
    }
};

function selectCreationAgent(element, agentType) {
    document.querySelectorAll('.creation-agent-item').forEach(el => {
        el.classList.remove('active');
    });
    element.classList.add('active');

    const config = creationAgentConfig[agentType] || creationAgentConfig['general'];

    // 更新标题和图标
    var titleEl = document.getElementById('creationAiTitle');
    var iconEl = document.getElementById('creationAiIcon');
    var textarea = document.getElementById('creationInput');
    var countEl = document.getElementById('creationInputCount');
    var btnEl = document.getElementById('creationStartBtn');
    var toolbar = document.getElementById('creationInputToolbar');

    if (titleEl) titleEl.textContent = config.title;
    if (iconEl) iconEl.className = 'ri ' + config.icon;
    if (textarea) textarea.placeholder = config.placeholder;
    if (btnEl) btnEl.querySelector('span').textContent = config.btnText;

    if (config.mode === 'translate') {
        if (countEl) countEl.style.display = 'none';
        if (toolbar) {
            // 先清空
            while (toolbar.firstChild) toolbar.removeChild(toolbar.firstChild);
            // 创建翻译布局
            var barDiv = document.createElement('div');
            barDiv.className = 'creation-translate-bar';
            barDiv.innerHTML = '<div class="creation-translate-lang">' +
                '<select class="creation-lang-select"><option>自动识别</option><option>中文</option><option>英语</option><option>日语</option><option>俄语</option></select>' +
                '<i class="ri-arrow-left-right-line"></i>' +
                '<select class="creation-lang-select"><option>中文</option><option>英语</option><option>日语</option><option>俄语</option></select>' +
                '</div>' +
                '<div class="creation-translate-actions">' +
                '<div class="creation-translate-action" onclick="alert(\'图片翻译功能开发中\')"><i class="ri-image-line"></i><span>图片翻译</span></div>' +
                '<div class="creation-translate-action" onclick="alert(\'文档翻译功能开发中\')"><i class="ri-file-text-line"></i><span>文档翻译</span></div>' +
                '</div>';
            toolbar.appendChild(barDiv);
        }
    } else {
        if (countEl) countEl.style.display = 'block';
        if (toolbar) {
            while (toolbar.firstChild) toolbar.removeChild(toolbar.firstChild);
            var normalDiv = document.createElement('div');
            normalDiv.className = 'creation-ds-inline';
            normalDiv.innerHTML = '<i class="ri-database-2-line"></i>' +
                '<select class="creation-ds-select">' +
                '<option>参考数据</option><option>全部专题库</option><option>高超声速技术</option><option>低轨星座</option><option>遥感解译</option><option>火箭推进</option>' +
                '</select>';
            toolbar.appendChild(normalDiv);
            var uploadDiv = document.createElement('div');
            uploadDiv.className = 'creation-upload-icon';
            uploadDiv.setAttribute('onclick', 'uploadAttachment()');
            uploadDiv.title = '上传附件';
            uploadDiv.innerHTML = '<i class="ri-attachment-2"></i>';
            toolbar.appendChild(uploadDiv);
        }
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

var workspaceDefaultTitle = null;
var workspaceDefaultTools = null;
var workspaceDefaultPlaceholder = null;

function restoreWorkspace() {
    var titleBar = document.querySelector('.input-title-bar .title-left');
    var tools = document.querySelector('.ai-input-tools');
    var textarea = document.getElementById('mainChatInput');
    var shortcuts = document.getElementById('aiShortcuts');
    if (!titleBar || !tools) return;

    titleBar.innerHTML = workspaceDefaultTitle;
    titleBar._agent = null;
    if (textarea) textarea.placeholder = workspaceDefaultPlaceholder;
    tools.innerHTML = workspaceDefaultTools;
    reinitDatasource();
    if (shortcuts) shortcuts.style.display = '';
}

function switchWorkspaceAgent(agentName) {
    var titleBar = document.querySelector('.input-title-bar .title-left');
    var tools = document.querySelector('.ai-input-tools');
    var textarea = document.getElementById('mainChatInput');
    var shortcuts = document.getElementById('aiShortcuts');
    if (!titleBar || !tools) return;

    if (workspaceDefaultTitle === null) {
        workspaceDefaultTitle = titleBar.innerHTML;
        workspaceDefaultPlaceholder = textarea ? textarea.placeholder : '';
        workspaceDefaultTools = tools.innerHTML;
    }

    // 如果已在此模式下，恢复
    if (titleBar._agent === agentName) {
        restoreWorkspace();
        return;
    }

    if (agentName === '象胥翻译') {
        titleBar.innerHTML = '<span class="workspace-close-btn" onclick="restoreWorkspace()"><i class="ri-close-line"></i></span><span style="padding-top:3px;"><i class="ri-translate"></i></span><span>象胥翻译</span>';
        titleBar._agent = '象胥翻译';
        if (textarea) textarea.placeholder = '输入需要翻译的内容...';
        if (shortcuts) shortcuts.style.display = 'none';

        tools.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 4px;">' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
                '<select style="padding:2px 4px;border:1px solid var(--border);border-radius:4px;font-size:12px;background:transparent;color:var(--text-primary);outline:none;">' +
                    '<option>自动识别</option><option>中文</option><option>英语</option><option>日语</option><option>俄语</option>' +
                '</select>' +
                '<i class="ri-arrow-left-right-line" style="color:var(--text-muted);font-size:14px;"></i>' +
                '<select style="padding:2px 4px;border:1px solid var(--border);border-radius:4px;font-size:12px;background:transparent;color:var(--text-primary);outline:none;">' +
                    '<option>中文</option><option>英语</option><option>日语</option><option>俄语</option>' +
                '</select>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:12px;">' +
                '<span style="display:flex;align-items:center;gap:4px;font-size:12px;cursor:pointer;color:var(--text-primary);" onclick="alert(\'图片翻译功能开发中\')">' +
                    '<i class="ri-image-line" style="font-size:14px;"></i>图片翻译' +
                '</span>' +
                '<span style="display:flex;align-items:center;gap:4px;font-size:12px;cursor:pointer;color:var(--text-primary);" onclick="alert(\'文档翻译功能开发中\')">' +
                    '<i class="ri-file-text-line" style="font-size:14px;"></i>文档翻译' +
                '</span>' +
            '</div>' +
        '</div>';
    } else {
        restoreWorkspace();
    }
}

function reinitDatasource() {
    var datasourceBtn = document.getElementById('datasourceBtn');
    var datasourceDropdown = document.getElementById('datasourceDropdown');
    if (!datasourceBtn || !datasourceDropdown) return;

    document.body.appendChild(datasourceDropdown);
    datasourceDropdown.style.position = 'fixed';

    var textEl = datasourceBtn.querySelector('.ai-datasource-text');
    if (textEl) {
        textEl.textContent = 'MossLib库';
        datasourceBtn.classList.add('active');
    }

    function positionDropdown() {
        var rect = datasourceBtn.getBoundingClientRect();
        datasourceDropdown.style.left = rect.left + 'px';
        datasourceDropdown.style.top = (rect.bottom + 4) + 'px';
    }

    function toggleDatasourcePanel(e) {
        e.stopPropagation();
        var isVisible = datasourceDropdown.style.display === 'block';
        if (isVisible) {
            datasourceDropdown.style.display = 'none';
            datasourceBtn.classList.remove('active');
        } else {
            positionDropdown();
            datasourceDropdown.style.display = 'block';
            datasourceBtn.classList.add('active');
        }
    }

    datasourceBtn.addEventListener('click', toggleDatasourcePanel);
}

document.addEventListener('DOMContentLoaded', () => {
    // 创作中心字数统计
    const creationInput = document.getElementById('creationInput');
    if (creationInput) {
        creationInput.addEventListener('input', updateCreationInputCount);
    }

    // 创作中心智能体点击事件委托
    var agentList = document.querySelector('.creation-agent-list');
    if (agentList) {
        agentList.addEventListener('click', function(e) {
            var item = e.target.closest('.creation-agent-item[data-agent]');
            if (item) {
                e.stopPropagation();
                var agentType = item.getAttribute('data-agent');
                selectCreationAgent(item, agentType);
            }
        });
    }

    // 工作台快捷按钮点击事件
    var shortcuts = document.getElementById('aiShortcuts');
    if (shortcuts) {
        shortcuts.addEventListener('click', function(e) {
            var btn = e.target.closest('.shortcut-btn[data-prompt]');
            if (!btn) return;
            var prompt = btn.getAttribute('data-prompt');
            if (prompt === '更多') return;
            e.stopPropagation();
            e.preventDefault();
            switchWorkspaceAgent(prompt);
        });
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

    const datasourceBtn = document.getElementById('datasourceBtn');
    const datasourceDropdown = document.getElementById('datasourceDropdown');

    if (datasourceBtn && datasourceDropdown) {
        datasourceBtn.removeAttribute('onclick');

        document.body.appendChild(datasourceDropdown);
        datasourceDropdown.style.position = 'fixed';

        const textEl = datasourceBtn.querySelector('.ai-datasource-text');
        if (textEl) {
            textEl.textContent = 'MossLib库';
            datasourceBtn.classList.add('active');
        }

        function positionDropdown() {
            const rect = datasourceBtn.getBoundingClientRect();
            datasourceDropdown.style.left = rect.left + 'px';
            datasourceDropdown.style.top = (rect.bottom + 4) + 'px';
        }

        function toggleDatasourcePanel(e) {
            e.stopPropagation();
            const isVisible = datasourceDropdown.style.display === 'block';
            if (isVisible) {
                datasourceDropdown.style.display = 'none';
                datasourceBtn.classList.remove('active');
            } else {
                positionDropdown();
                datasourceDropdown.style.display = 'block';
                datasourceBtn.classList.add('active');
            }
        }

        datasourceBtn.addEventListener('click', toggleDatasourcePanel);

        window.addEventListener('scroll', function() {
            if (datasourceDropdown.style.display === 'block') {
                positionDropdown();
            }
        });

        window.addEventListener('resize', function() {
            if (datasourceDropdown.style.display === 'block') {
                positionDropdown();
            }
        });

        document.addEventListener('click', function(e) {
            if (datasourceDropdown.style.display === 'block' &&
                !datasourceBtn.contains(e.target) &&
                !datasourceDropdown.contains(e.target)) {
                datasourceDropdown.style.display = 'none';
                datasourceBtn.classList.remove('active');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    startRandomSimulation();
});

// ==================== 情报中心页面逻辑 ====================

// 主轮播图
let intelCurrentSlide = 0;
let intelAutoPlayInterval;

function switchIntelSlide(index) {
    const slides = document.querySelectorAll('.intel-slide');
    const btns = document.querySelectorAll('.intel-cbtn');
    if (!slides.length) return;
    slides.forEach(s => { s.classList.remove('active'); });
    btns.forEach(b => { b.classList.remove('active'); });
    slides[index].classList.add('active');
    if (btns[index]) btns[index].classList.add('active');
    intelCurrentSlide = index;
    // Restart typing animation
    const te = slides[index].querySelector('.intel-ai-typing');
    if (te) { te.style.animation = 'none'; te.offsetHeight; te.style.animation = null; }
}

function nextIntelSlide() {
    const slides = document.querySelectorAll('.intel-slide');
    if (!slides.length) return;
    let next = (intelCurrentSlide + 1) % slides.length;
    switchIntelSlide(next);
}

function startIntelAutoPlay() {
    if (intelAutoPlayInterval) clearInterval(intelAutoPlayInterval);
    intelAutoPlayInterval = setInterval(nextIntelSlide, 6000);
}

// 智库推荐轮播
let intelRecCurrentSlide = 0;
let intelRecAutoInterval;

function switchIntelRecSlide(index) {
    const slides = document.querySelectorAll('.intel-rec-slide');
    const dots = document.querySelectorAll('.intel-rec-dot');
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    intelRecCurrentSlide = index;
}

function nextIntelRecSlide() {
    const slides = document.querySelectorAll('.intel-rec-slide');
    if (!slides.length) return;
    let next = (intelRecCurrentSlide + 1) % slides.length;
    switchIntelRecSlide(next);
}

function startIntelRecAutoPlay() {
    if (intelRecAutoInterval) clearInterval(intelRecAutoInterval);
    intelRecAutoInterval = setInterval(nextIntelRecSlide, 5000);
}

// 横向导航滚动
function scrollNav(elementId, distance) {
    const el = document.getElementById(elementId);
    if (el) el.scrollBy({ left: distance, behavior: 'smooth' });
}

// 实时入库更新
function addIntelNewUpdate(type, title, color) {
    const stream = document.getElementById('live-stream');
    if (!stream) return;
    const newEntry = document.createElement('div');
    newEntry.className = 'intel-stream-item';
    newEntry.style.borderColor = color;
    newEntry.innerHTML = `<span>刚刚</span><div><span style="color:${color};font-weight:700">【${type}】</span><span style="color:var(--text-secondary)">${title}</span></div>`;
    stream.prepend(newEntry);
    if (stream.children.length > 5) stream.removeChild(stream.lastChild);
}

// 动态焦点数据
const intelFocusData = [
    { type: '事件', icon: 'ri-global-line', title: 'X-5 高超音速风洞扩建工程', heat: 98, trend: '+32%', desc: '卫星影像确认地基施工范围扩大', tag: '异常预警', img: 'https://images.unsplash.com/photo-1569428034239-f9565c32f3aa?w=100&h=100&fit=crop' },
    { type: '人物', icon: 'ri-user-star-line', title: '林奇·卡特博士 (CMC材料首席)', heat: 94, trend: '+27%', desc: '连续主导三项耐热复合材料专利', tag: '技术先锋', img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop' },
    { type: '技术', icon: 'ri-cpu-line', title: '陶瓷基复合材料耐温突破2200°C', heat: 91, trend: '+45%', desc: '热防护领域颠覆性进展', tag: '专利热点', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=100&fit=crop' },
    { type: '事件', icon: 'ri-rocket-line', title: '可重复使用空天飞行器轨道测试', heat: 87, trend: '+18%', desc: '低成本快速响应能力验证', tag: '战略动态', img: 'https://images.unsplash.com/photo-1541185933596-2b3d09f3cc9b?w=100&h=100&fit=crop' },
    { type: '人物', icon: 'ri-user-voice-line', title: '空天动力研究院首席科学家张维', heat: 82, trend: '+21%', desc: '变循环发动机会议主旨演讲', tag: '重磅观点', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop' },
    { type: '技术', icon: 'ri-satellite-line', title: '低轨巨型星座频谱博弈激化', heat: 79, trend: '+39%', desc: 'ITU申报文件数量井喷', tag: '供应链风险', img: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=100&h=100&fit=crop' }
];

function renderIntelFocusList() {
    const grid = document.getElementById('hot-focus-grid');
    if (!grid) return;
    grid.innerHTML = intelFocusData.map(item => `
        <div class="intel-focus-card">
            <div>
                <div class="intel-focus-img"><img src="${item.img}" onerror="this.src='https://picsum.photos/id/20/100/100'"></div>
                <div class="intel-focus-info">
                    <div class="intel-focus-meta">
                        <div class="intel-focus-tags">
                            <i class="${item.icon}"></i>
                            <span class="intel-focus-type">${item.type}</span>
                            <span class="intel-focus-tag2">${item.tag}</span>
                        </div>
                        <div class="intel-focus-heat">
                            <i class="ri-fire-line"></i>
                            <span>${item.heat}</span>
                            <span>${item.trend}</span>
                        </div>
                    </div>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                    <div class="intel-focus-bar"><div style="width:${item.heat}%"></div></div>
                </div>
            </div>
        </div>
    `).join('');
}

let intelIntervalDynamic = null;
function startIntelDynamicHeat() {
    if (intelIntervalDynamic) clearInterval(intelIntervalDynamic);
    intelIntervalDynamic = setInterval(() => {
        intelFocusData.forEach(item => {
            let delta = (Math.random() - 0.5) * 8;
            let newHeat = item.heat + delta;
            newHeat = Math.min(99, Math.max(45, newHeat));
            item.heat = Math.floor(newHeat);
            let trendDelta = (Math.random() * 24 - 8).toFixed(0);
            let sign = (trendDelta >= 0 ? '+' : '');
            item.trend = `${sign}${trendDelta}%`;
        });
        intelFocusData.sort((a, b) => b.heat - a.heat);
        renderIntelFocusList();
        const timerSpan = document.getElementById('focus-timer');
        if (timerSpan) timerSpan.innerHTML = `热度数据实时波动 · 最新 ${new Date().toLocaleTimeString()}`;
    }, 15000);
}

// 全源情报推荐
const intelAllSourceCards = [
    { type: '资讯库', label: '最新资讯', icon: 'ri-newspaper-line', title: '美太空军发布下一代导弹预警卫星招标', desc: '强调对高超音速武器红外追踪能力升级，预计2030年部署。', tag: '热点事件', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
    { type: '专利库', label: 'AI翻译', icon: 'ri-award-line', title: '基于氮化镓的X波段相控阵雷达T/R模块设计', desc: '效率提升40%，体积缩小30%，或将改变机载火控格局。', tag: '技术突破', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
    { type: '预警', label: 'AI异常预警', icon: 'ri-alarm-warning-line', title: '西太平洋某港口异常舰船集结', desc: '结合AIS与光学影像，发现3艘新型驱逐舰同时出坞，置信度89%。', tag: '动态追踪', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
    { type: '关联发现', label: '知识图谱', icon: 'ri-mind-map', title: '高超音速导弹与CMC材料专利强关联', desc: '最新6项专利均指向同一研发团队，推测热防护取得实质突破。', tag: '隐含关系', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
    { type: '专题', label: '深度专题', icon: 'ri-stack-line', title: '无人机蜂群协同作战与抗干扰数据链', desc: '汇总DARPA、北约试验进展及抗量子加密应用。', tag: '战略前沿', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
    { type: '专家报告', label: '智库出品', icon: 'ri-file-pdf-line', title: '2026全球空天力量平衡评估', desc: '兰德公司发布，重点分析中俄高超音速武器及反制体系。', tag: '权威报告', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
    { type: '热点事件', label: '实时脉动', icon: 'ri-flashlight-line', title: '商业火箭公司实现首次空中发射高超音速试验平台', desc: '利用改装波音747发射，测试速度超过马赫5，引发业界关注。', tag: '产业动态', color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)' },
    { type: '装备库', label: '武器对比', icon: 'ri-rocket-line', title: '俄"锆石"高超音速导弹最新部署信息', desc: '新增两艘护卫舰搭载，射程/速度参数更新。', tag: '部署动态', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
    { type: '遥感数据', label: '卫星影像', icon: 'ri-satellite-line', title: '西北某试验场高频次施工活动监测', desc: '近2个月夜间光源异常增多，推测进行发动机试车准备。', tag: '基建预警', color: '#06b6d4', bg: 'rgba(6,182,212,0.08)' }
];

function renderIntelAllSource() {
    const grid = document.getElementById('all-source-grid');
    if (!grid) return;
    grid.innerHTML = intelAllSourceCards.map(card => `
        <div class="intel-allsource-card" style="border-left: 3px solid ${card.color}">
            <div>
                <i class="${card.icon}"></i>
                <span class="intel-allsource-type" style="background:${card.bg};color:${card.color}">${card.type}</span>
                <span class="intel-allsource-label">${card.label}</span>
            </div>
            <h3>${card.title}</h3>
            <p>${card.desc}</p>
            <div class="intel-allsource-footer">
                <span style="color:${card.color}"><i class="ri-price-tag-3-line"></i> ${card.tag}</span>
                <span><i class="ri-time-line"></i> 推荐匹配度87%</span>
            </div>
        </div>
    `).join('');
}

// 初始化情报中心
function initIntelligencePage() {
    const page = document.getElementById('page-intelligence');
    if (!page) return;
    
    renderIntelFocusList();
    startIntelDynamicHeat();
    renderIntelAllSource();
    
    // 启动轮播
    const slides = document.querySelectorAll('.intel-slide');
    if (slides.length > 0) {
        switchIntelSlide(0);
        startIntelAutoPlay();
        const container = document.getElementById('intel-carousel-container');
        if (container) {
            container.addEventListener('mouseenter', () => clearInterval(intelAutoPlayInterval));
            container.addEventListener('mouseleave', startIntelAutoPlay);
        }
    }
    
    // 启动智库轮播
    const recSlides = document.querySelectorAll('.intel-rec-slide');
    if (recSlides.length > 0) {
        switchIntelRecSlide(0);
        startIntelRecAutoPlay();
        const recContainer = document.getElementById('intel-rec-carousel');
        if (recContainer) {
            recContainer.addEventListener('mouseenter', () => clearInterval(intelRecAutoInterval));
            recContainer.addEventListener('mouseleave', startIntelRecAutoPlay);
        }
    }
    
    // 实时入库模拟
    setInterval(() => {
        addIntelNewUpdate('事件库', '监控到卫星发射基地频率异常波动', '#ef4444');
    }, 10000);
}

// 在页面切换时初始化
document.addEventListener('DOMContentLoaded', () => {
    initIntelligencePage();
});
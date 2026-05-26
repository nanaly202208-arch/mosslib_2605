let briefData = [];

function generateBriefData(timeRange, selectedSubIds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let count = 5;
            if (timeRange === '3d') count = 8;
            if (timeRange === '7d') count = 12;
            const isFiltered = selectedSubIds.length > 0 && !selectedSubIds.includes('all');
            const items = [];
            for (let i = 1; i <= count; i++) {
                items.push({
                    id: i,
                    title: `${isFiltered ? '（基于订阅筛选）' : ''} ${['高超声速技术新进展', '低轨星座部署动态', '遥感影像解译突破', '火箭推进系统优化', '电子战技术演进'][i % 5]}`,
                    summary: `这是由AI生成的第${i}条摘要内容，基于最近${timeRange === '24h' ? '24小时' : timeRange === '3d' ? '3天' : '7天'}内更新的情报。涉及关键技术点分析、数据对比和趋势预测...`,
                    source: `来源：${['SpaceX', 'ESA', 'NASA', '国防部', '学术期刊'][i % 5]}`,
                    date: new Date(Date.now() - i * 3600000).toLocaleString()
                });
            }
            resolve(items);
        }, 500);
    });
}

function renderBriefList(items) {
    const container = document.getElementById('briefSummaryList');
    if (!container) return;
    if (!items || items.length === 0) {
        container.innerHTML = '<div class="brief-empty">暂无摘要，请尝试刷新或调整筛选条件</div>';
        return;
    }
    container.innerHTML = items.map((item, idx) => `
        <div class="brief-item" data-id="${item.id}">
            <div class="brief-index">${idx + 1}</div>
            <div class="brief-content">
                <div class="brief-title-text" data-id="${item.id}">${item.title}</div>
                <div class="brief-summary-text">${item.summary}</div>
                <div class="brief-meta">
                    <span class="brief-source"><i class="ri-database-line"></i> ${item.source}</span>
                    <span><i class="ri-time-line"></i> ${item.date}</span>
                </div>
            </div>
        </div>
    `).join('');
    document.querySelectorAll('.brief-title-text').forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = el.getAttribute('data-id');
            alert(`跳转到情报详情页（ID: ${id}），功能开发中。`);
        });
    });
}

async function refreshBrief() {
    const timeRangeSelect = document.getElementById('briefTimeRange');
    const subFilterSelect = document.getElementById('briefSubFilter');
    const timeRange = timeRangeSelect ? timeRangeSelect.value : '24h';
    let selectedSubIds = [];
    if (subFilterSelect) {
        const val = subFilterSelect.value;
        if (val !== 'all') {
            selectedSubIds = [val];
        }
    }
    const container = document.getElementById('briefSummaryList');
    if (container) container.innerHTML = '<div class="brief-loading">🤖 AI正在分析最新情报，请稍候...</div>';

    const newData = await generateBriefData(timeRange, selectedSubIds);
    briefData = newData;
    renderBriefList(briefData);
}

function initBrief() {
    const subFilterSelect = document.getElementById('briefSubFilter');
    if (subFilterSelect && allSubscriptions) {
        allSubscriptions.forEach(sub => {
            const option = document.createElement('option');
            option.value = sub.id;
            option.textContent = sub.title;
            subFilterSelect.appendChild(option);
        });
    }
    const refreshBtn = document.getElementById('briefRefreshBtn');
    if (refreshBtn) refreshBtn.addEventListener('click', refreshBrief);
    const timeRangeSelect = document.getElementById('briefTimeRange');
    if (timeRangeSelect) timeRangeSelect.addEventListener('change', refreshBrief);
    const subFilterSelectEl = document.getElementById('briefSubFilter');
    if (subFilterSelectEl) subFilterSelectEl.addEventListener('change', refreshBrief);
    refreshBrief();
}
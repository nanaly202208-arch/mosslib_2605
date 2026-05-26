let activeSubIds = [];
let allSubscriptions = subscriptions;
let allItems = recommendItems;

function renderSubscriptionBar() {
    const bar = document.getElementById('subscriptionBar');
    if (!bar) return;
    bar.innerHTML = '';

    const total = allSubscriptions.length;
    const showCount = 5;
    const subsToShow = allSubscriptions.slice(0, showCount);
    const hasMore = total > showCount;

    subsToShow.forEach(sub => {
        const tag = createSubTagElement(sub);
        bar.appendChild(tag);
    });

    if (hasMore) {
        const moreWrapper = document.createElement('div');
        moreWrapper.className = 'more-dropdown';
        moreWrapper.innerHTML = `
            <div class="sub-tag" id="moreSubTrigger">
                <span class="sub-icon">📋</span> 更多 <span style="font-size: 10px;">▼</span>
            </div>
            <div class="dropdown-content" id="moreDropdownContent"></div>
        `;
        const dropdownContent = moreWrapper.querySelector('#moreDropdownContent');
        const remainingSubs = allSubscriptions.slice(showCount);
        remainingSubs.forEach(sub => {
            const tag = createSubTagElement(sub);
            dropdownContent.appendChild(tag);
        });
        bar.appendChild(moreWrapper);

        const trigger = moreWrapper.querySelector('#moreSubTrigger');
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!moreWrapper.contains(e.target)) {
                dropdownContent.classList.remove('show');
            }
        });
    }
}

function createSubTagElement(sub) {
    const tag = document.createElement('div');
    tag.className = 'sub-tag';
    if (activeSubIds.includes(sub.id)) tag.classList.add('active');

    const unreadCount = allItems.filter(item =>
        item.relatedSubIds && item.relatedSubIds.includes(sub.id)
    ).length;

    tag.innerHTML = `
        <span class="sub-avatar-icon"><i class="${sub.avatarIcon}"></i></span>
        <span class="sub-title">${sub.title}</span>
        ${unreadCount > 0 ? `<span class="sub-badge">${unreadCount}</span>` : ''}
    `;
    tag.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeSubIds.includes(sub.id)) {
            activeSubIds = activeSubIds.filter(id => id !== sub.id);
        } else {
            activeSubIds.push(sub.id);
        }
        renderSubscriptionBar();
        renderRecommendGrid();
    });
    return tag;
}

function renderRecommendGrid() {
    const grid = document.getElementById('recommendGrid');
    if (!grid) return;

    let filteredItems = allItems;
    if (activeSubIds.length > 0) {
        filteredItems = allItems.filter(item =>
            item.relatedSubIds && item.relatedSubIds.some(subId => activeSubIds.includes(subId))
        );
    }

    if (filteredItems.length === 0) {
        grid.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-muted);">📭 暂无相关推荐，试试其他订阅标签~</div>`;
        return;
    }

    const contentTypeColors = {
        '资讯': '#FFF7E6', '论文': '#E6F7FF', '专利': '#F6FFED',
        '专题': '#F9F0FF', '研究报告': '#FFF0F5', '论证报告': '#E8F8F5',
        '人物图谱': '#E6F9EC', '型号图谱': '#FEF2E8', '技术图谱': '#E8F0FE'
    };
    const confidenceClassMap = {
        '高': 'confidence-high', '中': 'confidence-mid', '低': 'confidence-low', '未知': 'confidence-unknown'
    };

    grid.innerHTML = filteredItems.map(item => {
        const hasImage = item.image && item.image.trim() !== '';
        const imageHtml = hasImage
            ? `<img class="card-image" src="${item.image}" alt="预览图" loading="lazy" onerror="this.src='https://placehold.co/400x200?text=No+Image'">`
            : '';

        const citationHtml = item.citations
            ? `<span class="citations"><i class="ri-double-quotes-l"></i> ${item.citations} 引用</span>`
            : '';

        let authorText = item.authors;
        if (authorText && authorText.length > 60) authorText = authorText.slice(0, 57) + '...';

        let subBadgesHtml = '';
        if (item.relatedSubIds && item.relatedSubIds.length > 0) {
            const relatedSubs = allSubscriptions.filter(sub => item.relatedSubIds.includes(sub.id));
            subBadgesHtml = `<div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">` +
                relatedSubs.map(sub => `<span class="card-sub-badge" data-sub-id="${sub.id}"><i class="${sub.avatarIcon}"></i> ${sub.title}</span>`).join('') +
                `</div>`;
        }
        const typeBadgeHtml = `<span class="card-type-badge" style="background: ${contentTypeColors[item.contentType] || '#F0F0F0'};">${item.contentType || '其他'}</span>`;
        const confidenceClass = confidenceClassMap[item.confidence] || 'confidence-mid';
        const confidenceHtml = `<span class="card-confidence-tag ${confidenceClass}">${item.confidence || '未知'}</span>`;

        return `
            <div class="recommend-card-item">
                ${imageHtml}
                <div class="card-content">
                    <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                        ${typeBadgeHtml}
                        ${confidenceHtml}
                    </div>
                    <div class="card-title">
                        <a href="#">${item.title}</a>
                    </div>
                    <div class="card-meta">
                        <span><i class="ri-calendar-line"></i> ${item.date}</span>
                        <span><i class="ri-map-pin-line"></i> ${item.country}</span>
                        <span><i class="ri-user-line"></i> ${authorText}</span>
                        ${citationHtml ? `<span>${citationHtml}</span>` : ''}
                    </div>
                    <div class="card-tags">
                        ${item.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="card-abstract">
                        ${item.abstract}
                    </div>
                    ${subBadgesHtml}
                    <div class="card-footer">
                        <span>📖 ${item.journal}</span>
                        <div class="card-actions">
                            <i class="ri-bookmark-line" title="收藏" onclick="handleCollect(event, '${item.id}')"></i>
                            <i class="ri-message-3-line" title="AI阅读" onclick="handleAIRead(event, '${item.id}', '${item.title}')"></i>
                            <i class="ri-more-2-fill" title="更多" onclick="handleMore(event, '${item.id}')"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.card-sub-badge').forEach(badge => {
        badge.addEventListener('click', (e) => {
            e.stopPropagation();
            const subId = badge.getAttribute('data-sub-id');
            if (subId && !activeSubIds.includes(subId)) {
                activeSubIds.push(subId);
                renderSubscriptionBar();
                renderRecommendGrid();
            }
        });
    });
}

function initRecommend() {
    renderSubscriptionBar();
    renderRecommendGrid();

    const manageBtn = document.getElementById('moreSubscriptionBtn');
    if (manageBtn) {
        manageBtn.addEventListener('click', () => {
            alert('订阅管理功能开发中：可在此处配置信源、关键词、主题、类型。');
        });
    }
}
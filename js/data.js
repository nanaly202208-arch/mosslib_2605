const roleConfig = {
    researcher: {
        name: '研究员',
        avatar: '研',
        tag: '\uD83D\uDD2C 研究员模式',
        subtitle: '今日有 3 条新线索待分析，2 份报告待审阅',
        agents: [
            { icon: '\uD83D\uDD0D', name: '查线索' },
            { icon: '\uD83D\uDCDD', name: '写报告' },
            { icon: '\uD83D\uDCA1', name: '智能选题' },
            { icon: '\uD83E\uDDE9', name: '观点聚类' }
        ],
        myAgents: [
            { icon: '\uD83D\uDEF0\uFE0F', name: '航天情报分析', desc: '发射动态追踪' },
            { icon: '\uD83D\uDDFA\uFE0F', name: '遥感解译', desc: '影像变化检测' },
            { icon: '\uD83D\uDCC4', name: '报告生成', desc: '开题/研究辅助' }
        ],
        todo: [
            { title: '高超声速飞行器热防护材料最新进展分析', meta: '今日 18:00', tag: '线索分析', priority: 'high', type: '课题研究' },
            { title: 'NASA 2024 Q2 预算报告翻译审校', meta: '明日 12:00', tag: '翻译任务', priority: 'medium', type: '翻译任务' },
            { title: '低轨卫星星座频谱分配情报聚类', meta: '5月22日', tag: '课题报告', priority: 'low', type: '课题研究' },
            { title: '某国新型火箭发动机试车数据研判', meta: '今日 20:00', tag: '情报分析', priority: 'high', type: '数据审核' }
        ],
        sentinel: [
            { id: 'res_alert1', type: 'alert', label: '\uD83D\uDD25 热点预警', desc: 'SpaceX 星舰第4次试飞技术参数更新...', time: '10分钟前 \u00B7 自动监测' },
            { id: 'res_info1', type: 'info', label: '\uD83D\uDCE5 信源更新', desc: 'ESA 发布 2026-2030 技术路线图...', time: '1小时前 \u00B7 ESA官方' },
            { id: 'res_tip1', type: 'tip', label: '\uD83D\uDCA1 课题关联', desc: '遥感数据匹配到您的课题...', time: '3小时前 \u00B7 AI关联引擎' },
            { id: 'res_alert2', type: 'alert', label: '\u26A0\uFE0F 任务提醒', desc: '翻译项目\u201C欧洲运载器研究\u201D距离截止还剩 18 小时...', time: '30分钟前 \u00B7 项目管理系统' },
            { id: 'res_info2', type: 'info', label: '\uD83D\uDCCA 数据同步', desc: '外部信源\u201C航空周刊\u201D已完成今日增量同步...', time: '2小时前 \u00B7 同步系统' }
        ],
        chatWelcome: '您好！我是 MossLib AI 助手。当前处于 <strong>研究员</strong> 模式。<br><br>我可以帮您：<br>\u2022 情报检索与线索提取<br>\u2022 撰写开题/研究报告<br>\u2022 观点聚类与关联分析<br>\u2022 遥感数据解译辅助<br><br>请直接输入需求，或点击下方智能体快捷入口。'
    },
    translator: {
        name: '译员',
        avatar: '译',
        tag: '\uD83C\uDF10 译员模式',
        subtitle: '今日有 2 个翻译任务待完成，1 个项目进入审校阶段',
        agents: [
            { icon: '\uD83C\uDF10', name: '象胥翻译' },
            { icon: '\uD83D\uDCCB', name: '术语提示' },
            { icon: '\u2705', name: '质量检查' },
            { icon: '\uD83D\uDCCA', name: '进度跟踪' }
        ],
        myAgents: [
            { icon: '\uD83C\uDF10', name: '象胥翻译', desc: 'AI辅助翻译' },
            { icon: '\uD83D\uDCDA', name: '术语管家', desc: '专业术语提示' },
            { icon: '\u2705', name: '审校助手', desc: '一致性检查' }
        ],
        todo: [
            { title: 'NASA FY2026 Budget Request Summary', meta: '英译中 \u00B7 12,500字 \u00B7 今日截止', tag: '翻译任务', priority: 'high' },
            { title: 'ESA Ariane 6 技术手册 Chapter 3', meta: '法译中 \u00B7 审校反馈待处理', tag: '审校任务', priority: 'medium' },
            { title: 'JAXA 火箭发动机试验报告', meta: '日译中 \u00B7 术语库更新', tag: '翻译任务', priority: 'low' },
            { title: 'Roscosmos 年度发射计划综述', meta: '俄译中 \u00B7 明日截止', tag: '翻译任务', priority: 'high' }
        ],
        sentinel: [
            { type: 'info', label: '\uD83D\uDCDA 术语更新', desc: '术语库已自动更新 23 条航天新材料相关术语，建议同步至当前项目', time: '20分钟前 \u00B7 术语系统' },
            { type: 'alert', label: '\u23F0 项目预警', desc: '翻译项目\u201C欧洲运载器研究\u201D距离截止还剩 18 小时', time: '30分钟前 \u00B7 项目系统' },
            { type: 'tip', label: '\uD83D\uDCA1 AI建议', desc: '检测到\u201Creusable launch vehicle\u201D存在3种译法，建议统一为\u201C可重复使用运载器\u201D', time: '1小时前 \u00B7 象胥翻译' },
            { type: 'info', label: '\uD83D\uDCE5 新任务分配', desc: '项目经理为您分配了\u201CJAXA试验报告\u201D翻译任务', time: '2小时前 \u00B7 翻译管理' }
        ],
        chatWelcome: '您好！我是 MossLib AI 助手。当前处于 <strong>译员</strong> 模式。<br><br>我可以帮您：<br>\u2022 象胥智能翻译辅助<br>\u2022 术语一致性检查<br>\u2022 专业领域译文审校<br>\u2022 翻译进度与质量分析<br><br>请直接输入需求，或点击下方智能体快捷入口。'
    },
    manager: {
        name: '管理者',
        avatar: '管',
        tag: '\uD83D\uDCCA 管理者模式',
        subtitle: '情报分析部门本周产出 5 份报告，翻译中心有 2 个项目即将到期',
        agents: [
            { icon: '\uD83D\uDCCA', name: '进度看板' },
            { icon: '\u26A0\uFE0F', name: '风险预警' },
            { icon: '\uD83D\uDC65', name: '人员负荷' },
            { icon: '\uD83D\uDCC8', name: '产出统计' }
        ],
        myAgents: [
            { icon: '\uD83D\uDCCA', name: '项目总览', desc: '全局进度监控' },
            { icon: '\uD83D\uDC65', name: '团队效能', desc: '人员负荷分析' },
            { icon: '\u26A1', name: '算力调度', desc: '资源分配优化' }
        ],
        todo: [
            { title: '审批\u201C可重复使用运载器\u201D课题中期报告', meta: '申请人: 张伟 \u00B7 今日截止', tag: '审批', priority: 'high' },
            { title: '翻译项目\u201C欧洲运载器研究\u201D延期申请', meta: '申请人: 王芳 \u00B7 需今日确认', tag: '审批', priority: 'high' },
            { title: '情报分析部门月度绩效考核', meta: '截止: 5月25日', tag: '管理', priority: 'medium' },
            { title: '新入职研究员系统权限配置', meta: '待处理: 3人', tag: '系统', priority: 'medium' }
        ],
        sentinel: [
            { type: 'alert', label: '\u26A0\uFE0F 项目风险', desc: '翻译中心有 2 个项目即将超期，建议优先调配审校资源', time: '15分钟前 \u00B7 风险监测' },
            { type: 'info', label: '\uD83D\uDCC8 产出通报', desc: '情报分析部门本周完成 5 份研究报告，较上周增长 25%', time: '1小时前 \u00B7 统计系统' },
            { type: 'tip', label: '\uD83D\uDCA1 人员建议', desc: '研究员李芳本周负荷率 92%，建议暂缓分配新课题', time: '2小时前 \u00B7 效能分析' },
            { type: 'alert', label: '\uD83D\uDD12 安全提醒', desc: '检测到 2 个账号存在异常登录行为，建议复核权限', time: '30分钟前 \u00B7 安全中心' }
        ],
        chatWelcome: '您好！我是 MossLib AI 助手。当前处于 <strong>管理者</strong> 模式。<br><br>我可以帮您：<br>\u2022 全局项目进度监控<br>\u2022 团队效能与风险预警<br>\u2022 资源调配建议<br>\u2022 产出统计与趋势分析<br><br>请直接输入需求，或点击下方智能体快捷入口。'
    },
    dataadmin: {
        name: '数据管理员',
        avatar: '数',
        tag: '\uD83D\uDDC3\uFE0F 数据管理员模式',
        subtitle: '本周新增外部数据源 3 个，实体库更新 156 条，数据质量巡检正常',
        agents: [
            { icon: '\uD83C\uDF10', name: '信源接入' },
            { icon: '\uD83D\uDD17', name: '实体关联' },
            { icon: '\uD83E\uDDF9', name: '数据清洗' },
            { icon: '\uD83D\uDCCA', name: '血缘分析' }
        ],
        myAgents: [
            { icon: '\uD83C\uDF10', name: '信源监控', desc: 'API健康检测' },
            { icon: '\uD83C\uDFE2', name: '实体补全', desc: '关系图谱维护' },
            { icon: '\uD83E\uDDF9', name: '质量巡检', desc: '异常数据识别' }
        ],
        todo: [
            { title: 'Space-Track API 数据源稳定性修复', meta: '优先级: 高 \u00B7 影响遥感数据更新', tag: '运维', priority: 'high' },
            { title: '人物库\u201C航天工程师\u201D实体关系补全', meta: 'AI推荐补全 45 条关联', tag: '数据治理', priority: 'medium' },
            { title: '外部开源情报 RSS 源接入配置', meta: '新增 3 个信源待审核', tag: '接入', priority: 'medium' },
            { title: '遥感影像元数据标准化清洗', meta: '待处理: 1.2TB', tag: '清洗', priority: 'low' }
        ],
        sentinel: [
            { type: 'tip', label: '\uD83D\uDCA1 AI建议', desc: 'AI检测到人物库中\u201C马斯克\u201D实体关联的 12 条新动态尚未入库，建议自动抓取', time: '10分钟前 \u00B7 实体监控' },
            { type: 'info', label: '\uD83D\uDCE5 数据同步', desc: '外部信源\u201C航空周刊\u201D已完成今日增量同步，新增 23 篇文章', time: '30分钟前 \u00B7 同步系统' },
            { type: 'alert', label: '\u26A0\uFE0F 质量异常', desc: '遥感数据集\u201C某发射场SAR\u201D存在时间戳异常，建议人工复核', time: '1小时前 \u00B7 质量巡检' },
            { type: 'info', label: '\uD83D\uDCCA 血缘报告', desc: '本周数据血缘图谱更新完成，新增 156 条实体关系链路', time: '3小时前 \u00B7 血缘系统' }
        ],
        chatWelcome: '您好！我是 MossLib AI 助手。当前处于 <strong>数据管理员</strong> 模式。<br><br>我可以帮您：<br>\u2022 外部信源接入与监控<br>\u2022 实体关系自动补全<br>\u2022 数据质量异常检测<br>\u2022 血缘图谱分析<br><br>请直接输入需求，或点击下方智能体快捷入口。'
    },
    analyst: {
        name: '分析师',
        avatar: '析',
        tag: '\uD83D\uDCC8 分析师模式',
        subtitle: '今日需完成 2 份专题策展，遥感数据解译队列中有 5 个新任务',
        agents: [
            { icon: '\uD83C\uDFAF', name: '专题策展' },
            { icon: '\uD83D\uDEF0\uFE0F', name: '遥感解译' },
            { icon: '\uD83D\uDD17', name: '实体关联' },
            { icon: '\uD83D\uDCF0', name: '情报简报' }
        ],
        myAgents: [
            { icon: '\uD83C\uDFAF', name: '专题策展', desc: '情报专题构建' },
            { icon: '\uD83D\uDEF0\uFE0F', name: '遥感解译', desc: '影像变化检测' },
            { icon: '\uD83D\uDCF0', name: '简报生成', desc: 'AI自动策展' }
        ],
        todo: [
            { title: '某国发射场活动专题策展更新', meta: '新增 3 份遥感影像待关联', tag: '专题策展', priority: 'high' },
            { title: '全球低轨星座部署进展月度简报', meta: '截止: 明日 10:00', tag: '情报简报', priority: 'high' },
            { title: '实体库\u201C某新型火箭\u201D参数核验', meta: '多源数据交叉验证', tag: '数据核验', priority: 'medium' },
            { title: '高超声速武器试验动态跟踪周报', meta: '截止: 5月21日', tag: '跟踪报告', priority: 'medium' }
        ],
        sentinel: [
            { type: 'alert', label: '\uD83D\uDEF0\uFE0F 遥感预警', desc: '遥感数据解译助手已识别出发射场 2 处新建设施，建议启动专题关联分析', time: '20分钟前 \u00B7 遥感系统' },
            { type: 'info', label: '\uD83D\uDCE5 专题更新', desc: '您关注的\u201C低轨星座\u201D专题新增 8 条情报，其中 2 条为高置信度', time: '1小时前 \u00B7 专题系统' },
            { type: 'tip', label: '\uD83D\uDCA1 AI关联', desc: '检测到\u201C某新型火箭\u201D与\u201C热防护材料\u201D课题存在 5 条潜在关联线索', time: '2小时前 \u00B7 关联引擎' },
            { type: 'info', label: '\uD83D\uDCF0 简报生成', desc: '本周\u201C全球航天发射动态\u201D简报已自动生成，待您审阅发布', time: '3小时前 \u00B7 简报系统' }
        ],
        chatWelcome: '您好！我是 MossLib AI 助手。当前处于 <strong>分析师</strong> 模式。<br><br>我可以帮您：<br>\u2022 情报专题策展与更新<br>\u2022 遥感影像智能解译<br>\u2022 实体关系深度关联<br>\u2022 情报简报自动生成<br><br>请直接输入需求，或点击下方智能体快捷入口。'
    }
};

let currentRole = 'researcher';

const subscriptions = [
    { id: 'sub1', title: '高超声速技术', avatarIcon: 'ri-rocket-line', keywords: ['高超声速', '热防护', '超燃冲压'], sources: ['AIAA', 'NASA'] },
    { id: 'sub2', title: '低轨星座', avatarIcon: 'ri-satellite-line', keywords: ['Starlink', '频谱分配', '星座'], sources: ['SpaceX', 'ESA'] },
    { id: 'sub3', title: '风能叶片', avatarIcon: 'ri-windy-line', keywords: ['风力涡轮机', '叶片优化', '气动'], sources: ['风能研究与开发'] },
    { id: 'sub4', title: '遥感解译', avatarIcon: 'ri-radar-line', keywords: ['SAR', '目标检测', '遥感影像'], sources: ['Remote Sensing'] },
    { id: 'sub5', title: '火箭推进', avatarIcon: 'ri-fire-line', keywords: ['喷管', '推力性能', '火箭发动机'], sources: ['Journal of Propulsion'] }
];

const recommendItems = [
    {
        id: 1,
        type: '论文',
        contentType: '论文',
        confidence: '高',
        image: null,
        title: 'Collaborative Optimization of Aerodynamics and Wind Turbine Blades',
        authors: 'HE Fu-shan, Xingsheng Zheng, Weilin Luo',
        date: '2025/01/16',
        country: '瑞士',
        citations: 66,
        journal: '风能研究与开发',
        tags: ['期刊论文', '开放获取', '叶轮机械性能与优化'],
        abstract: '本文探讨多学科设计优化方法在水平轴风力涡轮机叶片设计中的应用...',
        relatedSubIds: ['sub3']
    },
    {
        id: 2,
        type: '专家研判',
        contentType: '研判报告',
        confidence: '高',
        image: null,
        title: '低轨星座频谱竞争态势研判（2026 Q1）',
        authors: '张宇航， 王思远',
        date: '2026/05/18',
        country: '中国',
        citations: null,
        journal: 'MossLib 航天战略研究室',
        tags: ['专家报告', '频谱分配', '战略分析'],
        abstract: '结合最新ITU申报数据和各国星座部署进度，研判未来三年频谱资源争夺关键节点...',
        relatedSubIds: ['sub2']
    },
    {
        id: 3,
        type: '专利',
        contentType: '专利',
        confidence: '高',
        image: null,
        title: '一种基于深度学习的遥感图像目标检测方法及系统',
        authors: '李华， 陈明',
        date: '2026/04/10',
        country: '中国',
        citations: null,
        journal: 'CN2026XXXXXX',
        tags: ['发明专利', '遥感智能解译'],
        abstract: '本发明公开了一种基于改进YOLOv8的遥感目标检测方法，针对小目标检测准确率低的问题...',
        relatedSubIds: ['sub4']
    },
    {
        id: 4,
        type: '专题合集',
        contentType: '专题',
        confidence: '高',
        image: 'https://picsum.photos/id/20/400/200',
        title: '高超声速武器防御技术进展合集',
        authors: 'MossLib 研究中心',
        date: '2026/05/01',
        country: '多国',
        citations: 24,
        journal: '专题策展',
        tags: ['专题', '防御技术', '高超声速'],
        abstract: '本合集收录近半年全球高超声速武器防御领域关键技术文献、试验报告及专家观点...',
        relatedSubIds: ['sub1']
    },
    {
        id: 5,
        type: '论文',
        contentType: '论文',
        confidence: '中',
        image: null,
        title: 'How do differences in airline passengers\u2019 satisfaction with connection modes affect last-mile travel choice?',
        authors: 'JiangBo Yu, Jiancheng Weng, Tian Wang',
        date: '2025/01/15',
        country: '英国',
        citations: 66,
        journal: '交通规划与优化',
        tags: ['期刊论文', '城市交通与可达性'],
        abstract: '基于随机后悔最小化模型，研究乘客对连接模式的满意度差异如何影响最后一公里出行选择...',
        relatedSubIds: []
    },
    {
        id: 6,
        type: '资讯',
        contentType: '资讯',
        confidence: '中',
        image: 'https://picsum.photos/id/3/400/200',
        title: 'SpaceX 星舰第4次试飞取得关键突破',
        authors: '路透社',
        date: '2026/05/19',
        country: '美国',
        citations: null,
        journal: '航天动态',
        tags: ['资讯', '星舰', '试飞'],
        abstract: '星舰S29完成轨道级飞行测试，一级超重助推器成功软着陆...',
        relatedSubIds: ['sub1']
    },
    {
        id: 7,
        type: '论文',
        contentType: '论文',
        confidence: '高',
        image: 'https://picsum.photos/id/104/400/200',
        title: 'Parametric study on configuration geometry effect on thrust performance of annular expansion deflection nozzle',
        authors: 'Ge Wang, Jun Zou, Lei Chen',
        date: '2025/01/15',
        country: '中国',
        citations: 66,
        journal: '计算流体力学与空气动力学',
        tags: ['期刊论文', '开放获取', '火箭与推进系统'],
        abstract: '通过数值模拟研究几何参数对环形膨胀偏转喷管推力性能的影响规律...',
        relatedSubIds: ['sub5']
    },
    {
        id: 8,
        type: '研究报告',
        contentType: '研究报告',
        confidence: '高',
        image: 'https://picsum.photos/id/26/400/200',
        title: 'AGM-183A ARRW高超音速导弹最新试射评估',
        authors: '美国空军研究实验室',
        date: '2026/05/10',
        country: '美国',
        citations: null,
        journal: '导弹技术动态',
        tags: ['高超音速', '空射快速响应武器', '试验评估'],
        abstract: '分析ARRW第5次全备弹飞行试验数据，重点评估助推器性能、滑翔体热防护及末端精度，相较前次试射，射程提升12%\u2026',
        relatedSubIds: ['sub1']
    },
    {
        id: 9,
        type: '技术图谱',
        contentType: '技术图谱',
        confidence: '高',
        image: 'https://picsum.photos/id/105/400/200',
        title: 'X-47B 舰载无人机关键技术演进图谱',
        authors: '海军航空系统司令部',
        date: '2026/04/22',
        country: '美国',
        citations: 32,
        journal: '无人机与自主系统',
        tags: ['舰载无人机', '自主着舰', '隐身技术'],
        abstract: '梳理X-47B从2005年概念验证到2015年航母弹射/拦阻试验的技术路线，衍生出MQ-25黄貂鱼加油机及CCA协同作战飞机\u2026',
        relatedSubIds: []
    },
    {
        id: 10,
        type: '资讯',
        contentType: '资讯',
        confidence: '低',
        image: 'https://picsum.photos/id/0/400/200',
        title: '俄\u201C锆石\u201D高超声速反舰导弹进入战斗值班',
        authors: '塔斯社',
        date: '2026/05/18',
        country: '俄罗斯',
        citations: null,
        journal: '防务新闻',
        tags: ['高超声速', '反舰导弹', '3M22'],
        abstract: '俄国防部宣布\u201C锆石\u201D正式部署于\u201C戈尔什科夫海军元帅\u201D号护卫舰，射程超1000公里，速度马赫9，可打击水面和地面目标\u2026',
        relatedSubIds: ['sub1', 'sub5']
    },
    {
        id: 11,
        type: '型号图谱',
        contentType: '型号图谱',
        confidence: '高',
        image: 'https://picsum.photos/id/46/400/200',
        title: '萨德（THAAD）反导系统部署与拦截记录全览',
        authors: '导弹防御局',
        date: '2026/03/15',
        country: '美国',
        citations: 18,
        journal: '防空反导年鉴',
        tags: ['末段高空防御', '动能拦截器', '实战拦截'],
        abstract: '汇总2010年至今全球萨德系统部署地点、拦截试验成功率（92%）及实战案例（沙特拦截胡塞武装弹道导弹）\u2026',
        relatedSubIds: []
    },
    {
        id: 12,
        type: '论证报告',
        contentType: '论证报告',
        confidence: '中',
        image: 'https://picsum.photos/id/34/400/200',
        title: '下一代电子战支援系统（ES-5000）能力框架论证',
        authors: '洛克希德\u00B7马丁',
        date: '2026/02/28',
        country: '美国',
        citations: null,
        journal: '电子战与信号情报',
        tags: ['电子攻击', '电子支援', '认知电子战'],
        abstract: '提出基于AI的威胁信号识别与自适应干扰调制技术，覆盖0.5-40GHz频段，可集成于F-35、无人机及舰载平台\u2026',
        relatedSubIds: []
    }
];
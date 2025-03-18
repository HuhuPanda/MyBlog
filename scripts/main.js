/**
 * 博客文章数据
 * @type {Array<Object>}
 */
const BLOG_POSTS = [
    {
        id: 1,
        title: {
            'zh-CN': '英语学习：如何有效提高听力水平',
            'zh-TW': '英語學習：如何有效提高聽力水平',
            'en': 'English Learning: How to Effectively Improve Listening Skills'
        },
        date: '2023-03-17',
        url: 'posts/英语学习：如何有效提高听力水平.html'
    },
    {
        id: 2,
        title: {
            'zh-CN': '秒变ASO专家：新手必读的一篇文章',
            'zh-TW': '秒變ASO專家：新手必讀的一篇文章',
            'en': 'Become an ASO Expert Instantly: A Must-Read Article for Beginners'
        },
        date: '2023-01-02',
        url: 'posts/秒变ASO专家：新手必读的一篇文章.html'
    },
    {
        id: 3,
        title: {
            'zh-CN': '电商副业：从新手小白到略小成的分享',
            'zh-TW': '電商副業：從新手小白到略小成的分享',
            'en': 'E-commerce Side Hustle: From Beginner to Moderate Success'
        },
        date: '2022-12-26',
        url: 'posts/电商副业：从新手小白到略小成的分享.html'
    },
    {
        id: 4,
        title: {
            'zh-CN': 'ARPU值是什么',
            'zh-TW': 'ARPU值是什麼',
            'en': 'What is ARPU?'
        },
        date: '2022-03-20',
        url: 'posts/ARPU值是什么.html'
    },
    {
        id: 5,
        title: {
            'zh-CN': '关于应用商店的基础认知',
            'zh-TW': '關於應用商店的基礎認知',
            'en': 'Basic Knowledge About App Stores'
        },
        date: '2022-03-15',
        url: 'posts/关于应用商店的基础认知.html'
    }
];

/**
 * 获取当前语言
 * @returns {string} 当前语言代码
 */
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'zh-CN';
}

/**
 * 渲染博客文章列表
 * @function renderArticles
 * @returns {void}
 */
function renderArticles() {
    const articleContainer = document.getElementById('articleContainer');
    if (!articleContainer) return;
    
    const currentLang = getCurrentLanguage();
    const publishedText = getTranslation ? getTranslation('published_on') : '发布于';
    
    try {
        const articlesHTML = BLOG_POSTS.map(post => `
            <div class="article-card">
                <a href="${post.url}" class="article-title">${post.title[currentLang] || post.title['zh-CN']}</a>
                <div class="article-meta">
                    ${publishedText} <time>${post.date}</time>
                </div>
            </div>
        `).join('');
        
        articleContainer.innerHTML = articlesHTML;
    } catch (error) {
        console.error('渲染文章列表时出错：', error);
        articleContainer.innerHTML = '<p>加载文章失败，请稍后重试。</p>';
    }
}

/**
 * 初始化侧边栏导航
 */
function initializeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // 判断当前页面路径，调整资源路径
    const isInPagesDir = window.location.pathname.includes('/pages/');
    const imgPath = isInPagesDir ? '../assets/avatar.jpg' : 'assets/avatar.jpg';

    const profile = `
        <div class="profile">
            <img src="${imgPath}" alt="头像" class="avatar">
            <h1 class="blog-title">Pandahu的博客</h1>
            <p class="blog-subtitle">专注英语学习、产品运营</p>
        </div>
    `;

    const nav = `
        <nav class="main-nav">
            <ul>
                <li><a href="${isInPagesDir ? 'about.html' : 'pages/about.html'}" class="nav-link">关于我</a></li>
            </ul>
        </nav>
    `;

    sidebar.innerHTML = profile + nav;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    if (document.getElementById('articleContainer')) {
        renderArticles();
    }
});

// 监听语言变化事件，重新渲染文章列表
document.addEventListener('languageChanged', () => {
    renderArticles();
});

// 删除不需要的 menuItems 
/**
 * 博客文章数据
 * @type {Array<Object>}
 */
const BLOG_POSTS = [
    {
        id: 3,
        title: '电商副业：从新手小白到略小成的分享',
        date: '2024-12-26',
        url: 'posts/电商副业：从新手小白到略小成的分享.html'
    },
    {
        id: 2,
        title: 'ARPU值是什么',
        date: '2024-03-20',
        url: 'posts/ARPU值是什么.html'
    },
    {
        id: 1,
        title: '关于应用商店的基础认知',
        date: '2024-03-15',
        url: 'posts/关于应用商店的基础认知.html'
    }
];

/**
 * 渲染博客文章列表
 * @function renderArticles
 * @returns {void}
 */
function renderArticles() {
    const articleContainer = document.getElementById('articleContainer');
    
    try {
        const articlesHTML = BLOG_POSTS.map(post => `
            <div class="article-card">
                <a href="${post.url}" class="article-title">${post.title}</a>
                <div class="article-date">${post.date}</div>
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

// 删除不需要的 menuItems 
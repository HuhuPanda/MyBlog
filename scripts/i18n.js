/**
 * 多语言支持
 * 支持简体中文、繁体中文和英文
 */

// 语言文本对象
const translations = {
    'zh-CN': {
        // 导航
        'home': '首页',
        'about': '关于我',
        
        // 首页
        'page_title': '首页',
        'blog_title': 'Pandahu的博客',
        'blog_subtitle': '专注英语学习、产品运营',
        'welcome_title': '欢迎来到「Pandahu 的博客」，个人独立博客。',
        'welcome_desc': '我会在这里持续记录个人经历、经验和思考。',
        'latest_articles': '最新文章',
        
        // 关于页面
        'about_title': '关于我',
        'about_intro': '90后，产品运营人一枚，业余时间经营一家网店和英语学习中',
        'goals_title': '2025年目标：',
        'goal_1': '完成12本英语原版书籍',
        'goal_2': '听力好到能参加雅思考试，顺利通过雅思考试',
        'goal_3': '上10个站点，走通出海网站流程，并希望取得美元收入',
        'contact_title': '关注我的公众号：湖畔花园，一起成长。',
        
        // 返回首页
        'back_home': '返回首页',
        
        // 日期文本
        'published_on': '发布于',
        
        // 公共部分
        'read_more': '阅读更多'
    },
    'zh-TW': {
        // 導航
        'home': '首頁',
        'about': '關於我',
        
        // 首頁
        'page_title': '首頁',
        'blog_title': 'Pandahu的博客',
        'blog_subtitle': '專注英語學習、產品運營',
        'welcome_title': '歡迎來到「Pandahu 的博客」，個人獨立博客。',
        'welcome_desc': '我會在這裡持續記錄個人經歷、經驗和思考。',
        'latest_articles': '最新文章',
        
        // 關於頁面
        'about_title': '關於我',
        'about_intro': '90後，產品運營人一枚，業餘時間經營一家網店和英語學習中',
        'goals_title': '2025年目標：',
        'goal_1': '完成12本英語原版書籍',
        'goal_2': '聽力好到能參加雅思考試，順利通過雅思考試',
        'goal_3': '上10個站點，走通出海網站流程，並希望取得美元收入',
        'contact_title': '關注我的公眾號：湖畔花園，一起成長。',
        
        // 返回首頁
        'back_home': '返回首頁',
        
        // 日期文本
        'published_on': '發布於',
        
        // 公共部分
        'read_more': '閱讀更多'
    },
    'en': {
        // Navigation
        'home': 'Home',
        'about': 'About Me',
        
        // Home page
        'page_title': 'Home',
        'blog_title': 'Pandahu\'s Blog',
        'blog_subtitle': 'Focus on English Learning & Product Operations',
        'welcome_title': 'Welcome to "Pandahu\'s Blog", a personal independent blog.',
        'welcome_desc': 'I will continuously share my personal experiences, insights, and thoughts here.',
        'latest_articles': 'Latest Articles',
        
        // About page
        'about_title': 'About Me',
        'about_intro': 'Born in the 90s, I\'m a product operations professional, running an online store in my spare time and learning English.',
        'goals_title': '2025 Goals:',
        'goal_1': 'Complete 12 English original books',
        'goal_2': 'Improve listening skills to take the IELTS test and pass it successfully',
        'goal_3': 'Launch 10 sites, complete the overseas website process, and hope to earn USD income',
        'contact_title': 'Follow my WeChat Official Account: Lakeside Garden, let\'s grow together.',
        
        // Return to home
        'back_home': 'Back to Home',
        
        // Date text
        'published_on': 'Published on',
        
        // Common parts
        'read_more': 'Read More'
    }
};

/**
 * 获取当前语言
 * @returns {string} 当前语言代码
 */
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'zh-CN';
}

/**
 * 切换语言
 * @param {string} lang 目标语言
 */
function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    updatePageLanguage();
}

/**
 * 根据当前语言更新页面文本
 */
function updatePageLanguage() {
    const currentLang = getCurrentLanguage();
    const langData = translations[currentLang];
    
    // 更新HTML元素中的文本
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });
    
    // 更新html标签的lang属性
    document.documentElement.lang = currentLang;
    
    // 触发自定义事件，告知其他脚本语言已更改
    const event = new CustomEvent('languageChanged', { detail: { language: currentLang } });
    document.dispatchEvent(event);
}

/**
 * 获取翻译文本
 * @param {string} key 翻译键名
 * @returns {string} 翻译后的文本
 */
function getTranslation(key) {
    const currentLang = getCurrentLanguage();
    return translations[currentLang][key] || key;
}

// 页面加载完成后初始化语言
document.addEventListener('DOMContentLoaded', () => {
    updatePageLanguage();
    
    // 初始化语言选择器
    initLanguageSelector();
});

/**
 * 初始化语言选择器
 */
function initLanguageSelector() {
    const languageSelectors = document.querySelectorAll('.language-selector');
    if (languageSelectors.length === 0) return;
    
    languageSelectors.forEach(languageSelector => {
        const buttons = languageSelector.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                switchLanguage(lang);
                
                // 更新所有语言选择器的选中状态
                document.querySelectorAll('.language-selector button').forEach(btn => {
                    if (btn.getAttribute('data-lang') === lang) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            });
            
            // 初始化选中状态
            if (button.getAttribute('data-lang') === getCurrentLanguage()) {
                button.classList.add('active');
            }
        });
    });
} 
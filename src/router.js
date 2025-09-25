import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import Member from "./views/member/Member.vue";
import Shop from "./views/Shop.vue";
import Task from "./views/Task.vue";
import Social from "./views/social/Social.vue";
import NotFound from "./views/NotFound.vue";
import Profile from "./views/member/Profile.vue";
import Notifications from "./views/Notifications.vue";
import Analysis from "./views/member/Analysis.vue";
import Setting from "./views/Setting.vue";
import Login from "./views/member/Login.vue";
import Register from "./views/member/Register.vue";
import CreatePost from "./views/social/CreatePost.vue"
import PostDetail from "./views/social/PostDetail.vue"






//URL <> Component
//路由對應表
const routes = [
    //首頁
    { path: '/', name: 'home', component: HomeView, meta: { layout: 'quick' } },
    //首頁內容，用頁面錨點
    // { path: "/hero", component: HeroComponentQS, name: "heroQS", meta: { layout: 'quick' } },
    // { path: "/about", component: AboutComponentQS, name: "aboutQS", meta: { layout: 'quick' } },
    // { path: "/features", component: FeaturesComponent, name: "featuresQS", meta: { layout: 'quick' } },
    // { path: "/services", component: ServicesComponentQS, name: "serviceQS", meta: { layout: 'quick' } },
    // { path: "/contact-hero", component: ContactComponentQS, name: "contactQS", meta: { layout: 'quick' } },

    //其他路由
    {
        path: "/member", component: Member, name: "member", meta: {
            layout: 'quickStarterPage',
            title: '會員儀表板',
            breadcrumb: ['Home', 'member']
        }
    },

    {
        path: '/shop', component: Shop, name: 'shop', meta: {
            layout: 'quickStarterPage',
            title: '商店頁面',
            breadcrumb: ['Home', 'Shop']
        }
    },

    {
        path: "/task", component: Task, name: "task", meta: {
            layout: 'quickStarterPage',
            title: '任務中心',
            breadcrumb: ['Home', 'Task']
        }
    },

    {
        path: "/forum",
        component: Social,
        name: "forum",
        meta: {
          layout: 'quickStarterPage',
          header: 'Forum',            // ← 只有這頁會套論壇版 header
          pageTitle: '論壇',
          breadcrumb: ['Home', 'forum'],
          showHero: false             // 若不想要上方大白灰區就設 false
        }
    },

    // 新增貼文
    {
      path: "/forum/create",
      component: CreatePost,
      name: "createPost",
      meta: {
        layout: 'quickStarterPage',
        header: 'Forum',
        title: '新增貼文',
        breadcrumb: ['Home', 'forum', 'Create']
      }
    },

    // 貼文詳情
    {
        path: "/forum/posts/:id", 
        component: PostDetail,
        name: "postDetail",
        meta: {
          layout: 'quickStarterPage',
          header: 'Forum',
          title: '貼文詳情',
          breadcrumb: ['Home', 'forum', 'PostDetail']
        }
    },



    { path: "/profile", component: Profile, name: "profile", meta: { layout: 'quickStarterPage' } },

    { path: "/notification", component: Notifications, name: "notification", meta: { layout: 'quickStarterPage' } },

    { path: "/analysis", component: Analysis, name: "analysis", meta: { layout: 'quickStarterPage' } },

    { path: "/settings", component: Setting, name: "settings", meta: { layout: 'quickStarterPage' } },

    {
        path: "/login", component: Login, name: "login", meta: {
            layout: 'tourIndex',
        }
    },

    {
        path: "/register", component: Register, name: "register", meta: {
            layout: 'tourIndex',
        }
    },


    // 404
    {
        path: "/:pathMatch(.*)*", component: NotFound, name: "notfound", meta: {
            layout: 'quickStarterPage',
            title: '404 Not Found',
            breadcrumb: ['Home', 'Not Found']
        }
    }



    // //首頁 index.html
    // { path: "/", redirect: "/index.html", meta: { layout: 'quick' } },  // 根路徑重定向到/index.html
    // { path: "/index.html#heroQS", component: HeroComponentQS, name: "heroQS", meta: { layout: 'quick' } },
    // { path: "/index.html#about", component: AboutComponentQS, name: "aboutQS", meta: { layout: 'quick' } },
    // { path: "/index.html#featuresQS", component: FeaturesComponent, name: "featuresQS", meta: { layout: 'quick' } },
    // { path: "/index.html#servicesQS", component: ServicesComponentQS, name: "serviceQS", meta: { layout: 'quick' } },
    // { path: "/index.html#contactQS", component: ContactComponentQS, name: "contactQS", meta: { layout: 'quick' } },

    // //其他路由
    // { path: "/member", component: Member, name: "member" },
    // { path: "/shop", component: Shop, name: "shop" },
    // { path: "/task", component: Task, name: "task" },
    // { path: "/social", component: Social, name: "social" },
    // { path: "/contact", component: Contact, name: "contact" },
    // { path: "/profile", component: Profile, name: "profile" },
    // { path: "/notification", component: Notifications, name: "notification" },
    // { path: "/analysis", component: Analysis, name: "analysis" },
    // { path: "/settings", component: Setting, name: "settings" },
    // { path: "/login", component: Login, name: "login" },
    // { path: "/register", component: Register, name: "register" },
    // { path: "/:pathMatch(.*)*", component: NotFound, name: "notfound" },
];



const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        } else if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})


export default router;
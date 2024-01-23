// 以遠端資源形式引入createApp
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
        return {
            // 配置數據
            // 建立物件並建立屬性username，password，預設空值
            user: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        // 配置登入邏輯
        login() {
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            axios.post(api, this.user).then((response) => {
                // 請求資源成功時
                // 解構response.data物件取出token、expired並賦值
                const { token, expired } = response.data;
                // 寫入 cookie token
                // expires 設置有效時間
                document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                window.location = 'products.html';
            }).catch((err) => {
                // 請求資源失敗時
                // 彈出視窗顯示失敗訊息
                alert(err.response.data.message);
            });
        },
    },
}).mount('#app');

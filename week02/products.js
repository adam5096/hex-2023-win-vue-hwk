import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            // apiPath: 'hexschoolvue',
            // 申請api時所註冊的自訂義api名稱
            apiPath: 'adam-gallery',
            products: [],
            tempProduct: {},
        }
    },
    methods: {
        // 驗證登入資訊正確與否
        checkAdmin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then(() => {
                    // 請求資源成功，執行getData函數
                    this.getData();
                })
                .catch((err) => {
                    // 請求資源失敗，彈出錯誤訊息框
                    alert(err.response.data.message)
                    // 頁面重定向到login.html登入頁結構
                    window.location = 'login.html';
                })
        },
        // 登入者資訊驗證正確後接著向伺服器發出資源請求
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            // 使用get方法發送請求
            axios.get(url)
                .then((response) => {
                    // 請求成功時，把回傳資料物件中的products內容取出後，放進本地products陣列
                    this.products = response.data.products;
                })
                .catch((err) => {
                    // 請求失敗時，彈出錯誤訊息框
                    alert(err.response.data.message);
                })
        },
        // 成功取回產品資料後，點擊"查看細節"按鈕觸發此邏輯(函數)
        openProduct(item) {
            // 點擊"查看細節"按鈕取得對應商品資料後，放進本地tempProduct物件，隨後渲染到頁面
            this.tempProduct = item;
        }
    },
    mounted() {
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        // 
        this.checkAdmin()
    }
}).mount('#app');

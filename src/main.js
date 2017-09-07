import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

Vue.use(Element);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    render: h => h(App)
})

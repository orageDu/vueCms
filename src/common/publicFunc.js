import Vue from 'vue'
import VueResource from 'vue-resource'
import { MessageBox } from 'element-ui'

Vue.use(VueResource)
const ajaxPost = e => {
    e.url = e.url ? e.url : ''
    e.data = e.data ? e.data : {}
    e.cb = e.success ? e.success : function () {}
    Vue.http.post(e.url, e.data).then(res => {
        if (res.status === 200 && res.body.code === 1) {
            e.cb(res)
        } else if (res.status !== 200) {
            this.$message({
                showClose: true,
                message: '网络错误',
                type: 'error'
            })
        } else {
             this.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
            })
        }
    })
}

const confirm = e => {
    e.title = e.title ? e.title : '确定要删除吗？'
    e.success = e.success ? e.success : function () {}
    e.error = e.error ? e.error : function () {}
     MessageBox.confirm(e.title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          e.success()
        }).catch(() => {
        })
}
export default {
    ajaxPost,
    confirm
}

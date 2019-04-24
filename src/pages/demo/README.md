## 这个是

注意：
Vue.use(name) 的组件里头必须得有name 名称，不然会报toLowercase error

用了 Vue.component(Alert.name, Alert) 之后，就可以使用name 的标签名称了
例如：
    ElAlert



bus 方案
```
import Vue from 'vue'
export var bus = new Vue()

bus.$on('tip', (text)=>{
})

bus.$emit('tip', '123')
```

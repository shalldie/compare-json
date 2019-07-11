<template>
    <div class="home">
        <h2 class="title">对比2个json内容</h2>
        <el-divider />
        <el-row>
            <el-tabs type="border-card" @tab-click="handleTabClick">
                <el-tab-pane label="JSON数据源">
                    <el-row class="code-wrap" :gutter="20">
                        <el-col :span="12">
                            <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入旧的json" v-model="json1" />
                        </el-col>
                        <el-col :span="12">
                            <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入新的json" v-model="json2" />
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="数据对比">
                    <el-row class="code-wrap" :gutter="20">
                        <el-col :span="24">
                            <json-mirror :value="tuple" />
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="Python 转 JSON">
                    <el-row class="code-wrap" :gutter="20">
                        <el-col :span="12">
                            <el-input type="textarea" autosize placeholder="请输入 python 对象的字符串格式数据" v-model="python.model" />
                        </el-col>
                        <el-col :span="12">
                            <el-input type="textarea" autosize placeholder="这里显示JSON格式数据" v-model="python.json" />
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-row>

    </div>
</template>

<script>
import JsonMirror from '../components/JsonMirror';
import * as _ from '../common/utils';
import parsePythonToJson, { defPythonContent } from '../common/parsePythonToJSON';

const d1 = `{
    "age": 12,
    "friends": [
        {
            "age": 12,
            "name": "tom"
        },
        {
            "age": 16,
            "name": "lily"
        }
    ],
    "name": "值不一样",
    "someElse": "多出来的"
}`;
const d2 = `{
    "name": "tom",
    "age": 12,
    "friends": [
        {
            "age": 16,
            "name": "lily"
        },
        {
            "age": 32,
            "name": "多出来的"
        },
        {
            "age": 12,
            "name": "tom"
        }
    ]
}`;

export default {
    name: 'home',
    components: {
        JsonMirror
    },
    data() {
        return {
            // json compare
            json1: d1,
            json2: d2,

            // python to json
            python: {
                model: defPythonContent,
                json: ''
            }
        }
    },
    computed: {
        tuple() {
            return [this.json1, this.json2];
        }
    },
    mounted() {
        // this.$nextTick(() => {
        //     this.mounted = true;
        // });
    },
    methods: {
        handleTabClick(tab) {
            this.parseJSON();
        },
        showErr(content, duration = 3000) {
            this.$message({
                dangerouslyUseHTMLString: true,
                showClose: true,
                message: content,
                type: 'error',
                duration
            });
        },
        parseJSON() {

            let [err, obj] = _.tryTuple(() => JSON.parse(this.json1));

            if (err) {
                this.showErr('左边填入了错误的json格式数据');
                return false;
            }

            obj = this.sortKey(obj);
            this.json1 = JSON.stringify(obj, null, '    ');

            [err, obj] = _.tryTuple(() => JSON.parse(this.json2));

            if (err) {
                this.showErr('右边填入了错误的json格式数据');
                return false;
            }

            obj = this.sortKey(obj);

            this.json2 = JSON.stringify(obj, null, '    ');

            return true;
        },
        sortKey(obj) {
            if (!obj) {
                return obj;
            }
            if (_.type(obj) === 'object') {
                const result = {};
                const keys = Object.keys(obj).sort();
                keys.forEach(key => {
                    result[key] = this.sortKey(obj[key]);
                });
                return result;
            }
            else if (_.type(obj) === 'array') {
                const arr = obj.slice();
                arr.sort((a, b) => {
                    let stra = JSON.stringify(a);
                    let strb = JSON.stringify(b);

                    // 先按长度排序
                    let diff = stra.length - strb.length;
                    if (diff) {
                        return diff;
                    }
                    // 不行就按unicode值来排序
                    return [stra, strb].sort()[0] === stra ? -1 : 1;
                });
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = this.sortKey(arr[i]);
                }
                return arr;
            }
            return obj;
        }
    },
    watch: {
        'python.model': {
            immediate: true,
            handler(model) {
                this.python.json = parsePythonToJson(model);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.home {
    max-width: 1000px;
    margin: 0 auto;
    padding: 50px 0 50px;

    .title {
        text-align: center;
    }

    .code-wrap {
        // padding: 0 20px;
    }
}
</style>


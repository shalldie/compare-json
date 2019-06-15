<template>
    <div class="home">
        <!-- <el-page-header @back="goBack" content="对比2个json内容" /> -->
        <h2 class="title">对比2个json内容</h2>
        <el-row class="code-wrap" :gutter="20">
            <el-col :span="12">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 20}" placeholder="请输入旧的json" v-model="json1" />
            </el-col>
            <el-col :span="12">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 20}" placeholder="请输入新的json" v-model="json2" />
            </el-col>
        </el-row>
        <el-divider />
        <el-row>
            <el-button @click="compare" type="primary">进行对比</el-button>
        </el-row>
    </div>
</template>

<script>
import * as _ from '../common/utils';

const d1 = `{"bottom_tip": "", "ontime_unavailable_reason": "", "ontime_promotion_text": "超时10分钟享赔付", "extra": {"agent_fee": {"icon_v2": {"frame_color": "ff2396ff", "text": "配送费", "text_color": "ffffff", "bg_colors": ["ff2396ff"]}, "sale_total_weight": 0.0, "description": "夜间配送暂时加价，敬请谅解", "original_price": 3.5, "price": 3.5, "name": "蜂鸟专送", "id": -10, "category_id": 2, "type": 0, "max_quantity": 1, "quantity": 1, "icon": {"color": "2396ff", "image_hash": "", "name": "蜂鸟"}}, "hongbao": null, "packing_fee": null, "merchant_coupon": null, "others": []}, "pindan": {"owners": [], "share_pindan": {"url": "https://h5.ele.me/spell/?cartId=7a6b77c68da411e98c8400163e024943&sig=d111c5b37d3047262c2886de932360aa&restaurant_id=E12774313944460151883", "title": "有人一起点外卖么？", "image_path": "http://fuss10.elemecdn.com/b/2e/a4100e0f3252af0496bf6d67c881bjpeg.jpeg?w=86&h=86", "description": "我要点【工具建店ancwy41480】的外卖，有一起点的么？"}, "order_id": 0, "lock": 0, "order_token": "", "num": 0, "is_pindan": 0, "unique_id": "0"}, "conditional_extra": [], "minimum_order_amount": 3.0, "total_weight": null, "tying_groups": [], "service_fee_explanation": "", "id": "7a6b77c68da411e98c8400163e024943", "is_pintuan": 0, "total": 7.5, "group": [[{"sku_id": "156553078278", "weight": 1, "scheme": "eleme://catering?target_food_id=200000027934&restaurant_id=E12774313944460151883&category_id=511075127", "weight_flag": 2, "attrs": [{"name": "甜度", "value": "微甜"}, {"name": "辣度", "value": "超甜"}], "beyond_time_peroid": 0, "image_hash": "eb0660241549ee62495d5a0c29b90da1jpeg", "specs": [], "group_id": 511075127, "ingredients": null, "new_specs": [], "id": 200000027934, "month_sales": null, "is_understock": 0, "is_valid": 1, "is_sold_out": 0, "garnish": [], "stock": 9978, "activities": [], "sale_total_weight": 0.0, "is_selected": true, "price": 2.0, "display_weight": null, "act_tags": [], "quantity": 2, "discount_amount": 0.0, "total_price": 4.0, "name": "棕香米饭", "min_purchase_quantity": 1, "sale_unit": "", "total_discount_amount": 0.0, "category_id": 1, "total_weight": null}]], "required_food_scheme": null, "ingredient_group": [], "is_address_too_far": 0, "sig": "d111c5b37d3047262c2886de932360aa", "paymethod_id": 66, "deliver_amount": 4.0, "abandoned_extra": [], "deliver_time": "", "original_total": 7.5, "package_group": [], "delivery_tip": {"content": "准时达服务: 超时10分钟享赔付", "color": "2396ff", "scheme": "eleme://web?url=https%3A//h5.ele.me/service/%23ontime"}, "discount_amount_sum": 0.0, "tying_sku_group": [], "ontime_description_scheme": "eleme://web?url=https%3A//h5.ele.me/service/%23ontime", "max_weight": null, "ontime_status": 2, "restaurant": {"status": 1, "delivery_type": {"bg_colors": ["00aaff", "0085ff"], "name": "蜂鸟专送", "text_color": "ffffff"}, "image_path": "b2ea4100e0f3252af0496bf6d67c881bjpeg", "piecewise_agent_fee": {"rules": [{"price": 3.0, "fee": 4.0}]}, "take_by_self": 0, "type": 0, "only_use_poi": 0, "is_fengniao": 1, "longitude": 121.382248, "phone": "15401893253", "next_business_time": "", "address": "近地铁广场", "latitude": 31.232948, "scheme": "eleme://catering?restaurant_id=E12774313944460151883", "closing_remain_seconds": 0, "id": 2147565965, "is_closed": 0, "name": "工具建店ancwy41480"}, "tying_sku_total": 0.0, "discount_amount": 0.0, "total_sum": 7.5, "pick_up_time": "", "ontime_logo": "77c1116ab58a80f0d97b949942c8635cpng"}`
const d2 = `{"bottom_tip": "", "ontime_unavailable_reason": "", "ontime_promotion_text": "超时10分钟享赔付", "extra": {"agent_fee": {"icon_v2": {"frame_color": "ff2396ff", "text": "配送费", "text_color": "ffffff", "bg_colors": ["ff2396ff"]}, "sale_total_weight": 0.0, "description": "夜间配送暂时加价，敬请谅解", "original_price": 3.5, "price": 3.5, "name": "蜂鸟专送", "id": -10, "category_id": 2, "type": 0, "max_quantity": 1, "quantity": 1, "icon": {"color": "2396ff", "image_hash": "", "name": "蜂鸟"}}, "hongbao": null, "packing_fee": null, "merchant_coupon": null, "others": []}, "pindan": {"owners": [], "share_pindan": {"url": "https://h5.ele.me/spell/?cartId=7a6b77c68da411e98c8400163e024943&sig=d111c5b37d3047262c2886de932360aa&restaurant_id=E12774313944460151883", "title": "有人一起点外卖么？", "image_path": "https://fuss.ar.elenet.me/b/2e/a4100e0f3252af0496bf6d67c881bjpeg.jpeg?w=86&h=86", "description": "我要点【工具建店ancwy41480】的外卖，有一起点的么？"}, "order_id": 0, "lock": 0, "order_token": "", "num": 0, "is_pindan": 0, "unique_id": "me.ele.trade.buy.biz.service.PindanService@23e61112"}, "conditional_extra": [], "minimum_order_amount": 3.0, "total_weight": null, "tying_groups": [], "service_fee_explanation": "", "id": "7a6b77c68da411e98c8400163e024943", "is_pintuan": 0, "total": 7.5, "group": [[{"sku_id": "156553078278", "weight": 1, "scheme": "eleme://catering?category_id=0&restaurant_id=E12774313944460151883&target_food_id=200000027934", "weight_flag": 2, "attrs": [{"name": "甜度", "value": "微甜"}, {"name": "辣度", "value": "超甜"}], "beyond_time_peroid": 0, "image_hash": "eb0660241549ee62495d5a0c29b90da1jpeg", "specs": [], "group_id": 0, "ingredients": null, "new_specs": [], "id": 200000027934, "month_sales": null, "is_understock": 0, "is_valid": 1, "is_sold_out": 0, "garnish": [], "stock": 2, "activities": [], "sale_total_weight": 0.0, "is_selected": true, "price": 2.0, "display_weight": null, "act_tags": [], "quantity": 2, "discount_amount": 0.0, "total_price": 4.0, "name": "棕香米饭", "min_purchase_quantity": 2, "sale_unit": "", "total_discount_amount": 0.0, "category_id": 1, "total_weight": null}]], "required_food_scheme": null, "ingredient_group": [], "is_address_too_far": 0, "sig": "d111c5b37d3047262c2886de932360aa", "paymethod_id": 66, "deliver_amount": 4.0, "abandoned_extra": [], "deliver_time": "", "original_total": 7.5, "package_group": [], "delivery_tip": {"content": "准时达服务:超时10分钟享赔付", "color": "2396ff", "scheme": "eleme://web?url=https%3A//h5.ele.me/service/%23ontime"}, "discount_amount_sum": 0.0, "tying_sku_group": [], "ontime_description_scheme": "eleme://web?url=https%3A//h5.ele.me/service/%23ontime", "max_weight": null, "ontime_status": 2, "restaurant": {"status": null, "delivery_type": {"bg_colors": ["00aaff", "0085ff"], "name": "蜂鸟专送", "text_color": "ffffff"}, "image_path": "b2ea4100e0f3252af0496bf6d67c881bjpeg", "piecewise_agent_fee": null, "take_by_self": 0, "type": 0, "only_use_poi": 0, "is_fengniao": 1, "longitude": 121.382248, "phone": "15401893253", "next_business_time": "", "address": "近地铁广场", "latitude": 31.232948, "scheme": "eleme://catering?restaurant_id=E12774313944460151883", "closing_remain_seconds": 0, "id": 2147565965, "is_closed": 0, "name": "工具建店ancwy41480"}, "tying_sku_total": 0.0, "discount_amount": 0.0, "total_sum": 7.5, "pick_up_time": "", "ontime_logo": "77c1116ab58a80f0d97b949942c8635cpng"}`;

export default {
    name: 'home',
    components: {
    },
    data() {
        return {
            json1: d1,
            json2: d2,

            obj1: {},
            obj2: {}
        }
    },
    methods: {
        showErr(content, duration = 3000) {
            this.$message({
                dangerouslyUseHTMLString: true,
                showClose: true,
                message: content,
                type: 'error',
                duration
            });
        },
        compare() {
            if (!this.parseJSON()) {
                return;
            }

            const arr1 = this.json1.split(/\r?\n/g);
            const arr2 = this.json2.split(/\r?\n/g);

            // console.log(arr1);

            for (let i = 0; i < arr1.length; i++) {
                const line1 = arr1[i];
                const line2 = arr2[i];

                if (line1 !== line2) {
                    const content = `
<div>第 <strong>${i + 1}</strong> 行出现差异:</div>
<div style="width:1000px;overflow:auto;">
<pre>

上一行：    ${arr1[i - 1]}

差异行：    ${arr1[i]}  =》  ${arr2[i].trim()}

下一行：    ${arr1[i + 1]}</pre>
</div>
`;
                    this.showErr(content, 0);
                    return;
                }
            }

            this.$message({
                showClose: true,
                message: '看起来应该没问题',
                type: 'success'
            });

        },
        parseJSON() {

            let [err, obj] = _.tryTuple(() => JSON.parse(this.json1));

            if (err) {
                this.showErr('左边填入了错误的json格式数据');
                return false;
            }

            this.obj1 = this.sortKey(obj);

            [err, obj] = _.tryTuple(() => JSON.parse(this.json2));

            if (err) {
                this.showErr('右边填入了错误的json格式数据');
                return false;
            }

            this.obj2 = this.sortKey(obj);

            this.json1 = JSON.stringify(this.obj1, null, '    ');
            this.json2 = JSON.stringify(this.obj2, null, '    ');

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
                    return JSON.stringify(a).length - JSON.stringify(b).length;
                });
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = this.sortKey(arr[i]);
                }
                return arr;
            }
            return obj;
        }
    }
}
</script>

<style lang="scss" scoped>
.home {
    max-width: 1000px;
    margin: 0 auto;
    padding-top: 50px;

    .title {
        text-align: center;
    }

    .code-wrap {
        // padding: 0 20px;
    }
}
</style>


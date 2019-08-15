// 用来存字符串的字典
const strMap = {};

function getRND() {
    return Math.random().toString(16);
}

function cacheStr(content = '') {
    // 1. 预处理莫名其妙的换行
    content = content.replace(/\n/g, '');

    // 2. 用key替换string
    content = content.replace(/'([^']*)'/g, (g0, g1) => {
        const key = getRND();
        strMap[key] = g1;
        return `'${key}'`;
    });

    return content;
}

function invokeParser(content) {
    const reg = /\w+\((.+?)\)($|]|,)/g;
    content = content.replace(reg, '{$1}$2');
    return content;
}

export default function parsePythonToJson(content = '') {
    try {

        content = cacheStr(content);

        content = content
            .trim()
            // .replace(/^\(|\)$/g, '')
            .replace(/None/g, 'null')
            .replace(/False/g, 'false')
            .replace(/True/g, 'true')
            .replace(/u'/g, `'`)
            .replace(/=/g, ':');

        const reg = /\w+\((.+?)\)($|]|,)/;
        while (reg.test(content)) {
            content = invokeParser(content);
        }

        for (let key in strMap) {
            content = content.replace(key, strMap[key]);
        }

        var obj = eval('(' + content + ')');
        return JSON.stringify(obj, null, '    ');
    }
    catch (ex) {
        console.log(ex);
        return '';
    }
}

export const defPythonContent = `TOperateCartClient(business_type=0, operating_entities=[TOperateEntity(weight_flag=None, sku_id=u'156589033416', sale_total_weight=0, ingredients=None, unselect=None, group_index=None, new_specs=None, step=1, attrs=None, id=200000074687, quantity=None)], user_id=6000102019, description=None, add_on_type=0, restaurant_id=2147569509, extra_action=None, bdwm_cheetfrom=None, operating_tying_entities=[], bdwm_cheetinfo=None, geohash=u'wtw39wxqkwf6', operating_sku_ids=None, ip=u'101.230.229.243', operating_packages=[], tying_supervip=0, app_version=u'8.5.1', come_from='ios', device_id=u'ASDLKHGFIDHG')`;

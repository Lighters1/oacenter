export default {
    //将下划线命名的对象改为驼峰命名的对象
    changeUnderline2Camel(target){
        let result = {};
        for (let key in target){
            let keyList = key.split("_");
            let newKey = "";
            for(let i =1;i<keyList.length;i++){
                newKey += keyList[i][0].toUpperCase()+keyList[i].slice(1);
            }
            newKey = keyList[0] + newKey;
            result[newKey] = target[key];
        }
        return result;
    },
    //对象拷贝
    copyObject(target,resource){
        for (let key in resource){
            if(target[key] != undefined){
                target[key] = resource[key];
            }
        }
    },
    //对象清空
    cleanobject(target){
        for(let key in target){
            target[key] = "";
        }
    }
}
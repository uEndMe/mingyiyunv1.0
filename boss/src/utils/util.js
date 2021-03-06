import crypto from 'crypto';

// MD5 加密
export const md5 = (str) => {
	let md5 = crypto.createHash("md5");

    md5.update(str);
    return md5.digest('hex');
}

export const makeSign = (arys) => {
    var newkey = Object.keys(arys).sort();　　
    var params_string = '';
    for(var i = 0; i < newkey.length; i++) {
        if(newkey[i] == 'sign') continue;
        if(arys[newkey[i]] instanceof Object)  continue;
        
        if(params_string != '') params_string += '&';
        // params_string += newkey[i] + '=' + encodeURIComponent(arys[newkey[i]]);
        params_string += newkey[i] + '=' + arys[newkey[i]];
    }

    // console.log(params_string);

    var md5 = crypto.createHash("md5");
    md5.update(params_string);

    return md5.digest('hex');
}

// 验证手机号码
export const rulePhone = (phone) => {
    return /^1[3456789]\d{9}$/.test(phone);
}

// 验证邮箱
export const ruleEmail = (email) => {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return  reg.test(email);
}

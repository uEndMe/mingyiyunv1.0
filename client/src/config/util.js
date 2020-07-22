import crypto from 'crypto';

// MD5 加密
export const md5 = (str) => {
    const md = crypto.createHash('md5');
    md.update(str);
    return md.digest('hex');
};

export const makeSign = (arys) => {
    const newkey = Object.keys(arys).sort();
    let paramsString = '';
    for (let i = 0; i < newkey.length; i += 1) {
        if (newkey[i] === 'sign') {continue;}
        if (arys[newkey[i]] instanceof Object) {continue;}
        if (paramsString !== '') {paramsString += '&';}
        paramsString += `${newkey[i]}=${encodeURIComponent(arys[newkey[i]])}`;
    }

    // console.log(paramsString);

    const md = crypto.createHash('md5');
    md.update(paramsString);

    return md.digest('hex');
};

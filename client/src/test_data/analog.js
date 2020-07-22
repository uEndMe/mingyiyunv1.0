/**
 * 订单页模拟数据
 */
const applied = [
    {
        goods_id: 1,
        goods_title: 'Casio Gulfmaster Master1',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 0,
        status_text: '审核中',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
    {
        goods_id: 2,
        goods_title: 'Casio Gulfmaster Master2',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 0,
        status_text: '审核中',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
    {
        goods_id: 11,
        goods_title: 'Casio Gulfmaster Master11',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 0,
        status_text: '审核中',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
];

const checked = [
    {
        goods_id: 3,
        goods_title: 'Casio Gulfmaster Master3',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 1,
        status_text: '审核通过',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
    {
        goods_id: 4,
        goods_title: 'Casio Gulfmaster Master4',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 1,
        status_text: '审核通过',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
    {
        goods_id: 12,
        goods_title: 'Casio Gulfmaster Master12',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 1,
        status_text: '审核通过',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
];

const upload = [
    {
        goods_id: 5,
        goods_title: 'Casio Gulfmaster Master5',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 3,
        status_text: '待传图',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
    {
        goods_id: 6,
        goods_title: 'Casio Gulfmaster Master6',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 3,
        status_text: '待传图',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
];

const completed = [
    {
        goods_id: 7,
        goods_title: 'Casio Gulfmaster Master7',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 7,
        status_text: '已完成',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
    {
        goods_id: 8,
        goods_title: 'Casio Gulfmaster Master8',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 7,
        status_text: '已完成',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
];

const failed = [
    {
        goods_id: 9,
        goods_title: 'Casio Gulfmaster Master9',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 8,
        status_text: '已失败',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
    {
        goods_id: 10,
        goods_title: 'Casio Gulfmaster Master10',
        goods_abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        goods_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: 'JACK WORK',
        status: 9,
        status_text: '已失败',
        rebate: 5000,
        add_time: '2020-05-05 18:23:50',
    },
];

const test = () => [].concat(applied, checked, upload, completed, failed);

export const orderListTest = (params) => {
    let data = {
        list: [],
        count: 0,
    };
    for (let i = params.limit * (params.page - 1); i < params.limit * params.page; i++) {
        switch (params.status) {
            case '0':
                if (applied[i] === undefined) {continue;}
                data.list.push(applied[i]);
                data.count = applied.length;
                break;
            case '1':
                if (checked[i] === undefined) {continue;}
                data.list.push(checked[i]);
                data.count = checked.length;
                break;
            case '3':
                if (upload[i] === undefined) {continue;}
                data.list.push(upload[i]);
                data.count = upload.length;
                break;
            case '7':
                if (completed[i] === undefined) {continue;}
                data.list.push(completed[i]);
                data.count = completed.length;
                break;
            case '8':
                if (failed[i] === undefined) {continue;}
                data.list.push(failed[i]);
                data.count = failed.length;
                break;
            default:
                if (test()[i] === undefined) {continue;}
                data.list.push(test()[i]);
                data.count = test().length;
        }
    }
    return data;
};


/**
 * collection 数据
 */
const collection = [
    {
        goods_id: 1,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 1,
        goods_delete: 0,
        collection_time: '2020-05-12',
        img_path: 'https://img.yzcdn.cn/vant/cat.jpeg',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 0,
    },
    {
        goods_id: 2,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 0,
        goods_delete: 0,
        collection_time: '2020-05-12',
        img_path: 'https://img.yzcdn.cn/vant/cat.jpeg',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 0,
    },
    {
        goods_id: 3,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 0,
        goods_delete: 1,
        collection_time: '2020-05-12',
        img_path: '',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 0,
    },
    {
        goods_id: 4,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 1,
        goods_delete: 0,
        collection_time: '2020-05-12',
        img_path: 'https://img.yzcdn.cn/vant/cat.jpeg',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 1,
    },
    {
        goods_id: 5,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 0,
        goods_delete: 1,
        collection_time: '2020-05-12',
        img_path: '',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 0,
    },
    {
        goods_id: 6,
        goods_title: '',
        goods_status: 1,
        goods_delete: 0,
        collection_time: '2020-05-12',
        img_path: 'https://img.yzcdn.cn/vant/cat.jpeg',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 0,
    },
    {
        goods_id: 7,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 1,
        goods_delete: 0,
        collection_time: '2020-05-12',
        img_path: 'https://img.yzcdn.cn/vant/cat.jpeg',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 1,
    },
    {
        goods_id: 8,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 1,
        goods_delete: 0,
        collection_time: '2020-05-12',
        img_path: 'https://img.yzcdn.cn/vant/cat.jpeg',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 0,
    },
    {
        goods_id: 9,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 0,
        goods_delete: 0,
        collection_time: '2020-05-12',
        img_path: 'https://img.yzcdn.cn/vant/cat.jpeg',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 0,
    },
    {
        goods_id: 10,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 0,
        goods_delete: 1,
        collection_time: '2020-05-12',
        img_path: '',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 0,
    },
    {
        goods_id: 11,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 1,
        goods_delete: 0,
        collection_time: '2020-05-12',
        img_path: 'https://img.yzcdn.cn/vant/cat.jpeg',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 1,
    },
    {
        goods_id: 12,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 0,
        goods_delete: 1,
        collection_time: '2020-05-12',
        img_path: '',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 0,
    },
    {
        goods_id: 13,
        goods_title: '',
        goods_status: 1,
        goods_delete: 0,
        collection_time: '2020-05-12',
        img_path: 'https://img.yzcdn.cn/vant/cat.jpeg',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 0,
    },
    {
        goods_id: 14,
        goods_title: 'Casio Gulfmaster Master5',
        goods_status: 1,
        goods_delete: 0,
        collection_time: '2020-05-12',
        img_path: 'https://img.yzcdn.cn/vant/cat.jpeg',
        abstract: 'G Men\'s Quartz Twin Sensor 53.mm',
        apply_status: 1,
    },
];

export const collectionData = (params) => {
    let data = {
        list: [],
        count: collection.length,
    };
    for (let i = params.limit * (params.page - 1); i < params.limit * params.page; i++) {
        if (collection[i] === undefined) {continue;}
        data.list.push(collection[i]);
    }
    return data;
};

export const collectLength = collection.length;

export default [
  {
    id: 1,
    name: "杨国荣",
    icon: "https://img.yzcdn.cn/vant/sand.jpg",
    tag: ["专科医师", "主治医师"],
    time: "7-20",
    focus: false,
    img: "https://img.yzcdn.cn/vant/tree.jpg", // 发布问题 可选
    txt: "这是一个调查问卷的描述，很长很长很长的，只显示两行，多出的省略",
    title: "这是一个简短的标题", // 发布调研 标题
    case: [
      // 发布调研 选项
      { txt: "小米,华为", count: 321 },
      { txt: "魅族", count: 966 },
      { txt: "苹果", count: 1245 },
      { txt: "其他", count: 0 }
    ],
    count: 2280,
    chats: [
      {
        img: "https://img.yzcdn.cn/vant/sand.jpg",
        txt:
          "这是一条评论，很长很长的很长很长很长的很长很长很长的很长很长很长的很长很长很长的很长很长很长的很长很长很长的很长",
        name: "胡杨",
        time: "7-20",
        reply: 33
      },
      {
        img: false,
        txt:
          "这是一条评论，很长很长的长的很长很长很长的很长很长很长的很长很长很长的很长很长很长的很长很长很长的很长很长很长的很长",
        name: "张三",
        time: "7-20",
        reply: 38
      }
    ]
  },

  {
    id: 2,
    name: "杨怡欣",
    icon: "https://img.yzcdn.cn/vant/sand.jpg",
    tag: ["专科医师", "主治医师"],
    time: "7-20",
    focus: false,
    txt: "这是一个调查问卷的描述",
    title: "这是标题",
    case: [
      { txt: "小米,华为", count: 321 },
      { txt: "其他", count: 0 }
    ],
    count: 1000,
    chats: [
      {
        img: "https://img.yzcdn.cn/vant/sand.jpg",
        txt: "这是一条评论",
        name: "胡杨",
        time: "7-20",
        reply: 33
      },
      {
        img: false,
        txt: "略",
        name: "张三",
        time: "7-20",
        reply: 38
      }
    ]
  }
];

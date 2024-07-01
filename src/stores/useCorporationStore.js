import axios from 'axios'

const token = JSON.parse(localStorage.getItem('token'))?.token

// console.log(token)

const baseUrl = 'http://100.122.113.8:8000'

const staticUser = {
  user_id: 5,
  last_login: '2024-06-30T15:23:01.480044+08:00',
  first_name: '1',
  last_name: '凯',
  email: '21373078@buaa.edu.cn',
  date_joined: '2024-06-25T14:09:56.940082+08:00',
  username: '网民',
  degree: '高中',
  blog: 'https://git.code.tencent.com/',
  repo: 'https://git.code.tencent.com/',
  resume: 'https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/resume/5-Resume.pdf',
  icon: 'https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/icon/enterprise/default.png',
  tag: [4]
}

const staticUserProfile = {
  id: 1,
  is_admin: true,
  work_age: 0,
  job: '',
  user: 5,
  enterprise: 1
}

const staticEnterpriseInfo = {
  enterprise_id: 1,
  name: '麒麟软件有限公司',
  introduction: '专注于国产OS设计与制造',
  icon: 'https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/icon/enterprise/1.png',
  field: '国产OS'
}

const staticEnterpriseUserInfoPre = {
  data: [
    {
      id: 1,
      is_admin: true,
      work_age: 0,
      job: '',
      user: 5,
      enterprise: 1
    }
  ]
}

const staticEnterpriseUserInfoPre2 = [
  {
    user_id: 5,
    last_login: '2024-06-30T15:23:01.480044+08:00',
    first_name: '1',
    last_name: '凯',
    email: '21373078@buaa.edu.cn',
    date_joined: '2024-06-25T14:09:56.940082+08:00',
    username: '网民',
    degree: '高中',
    blog: 'https://git.code.tencent.com/',
    repo: 'https://git.code.tencent.com/',
    resume: 'https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/resume/5-Resume.pdf',
    icon: 'https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/icon/enterprise/default.png',
    tag: [4]
  },
  {
    user_id: 1,
    last_login: '2024-07-01T10:20:30.123456+08:00',
    first_name: '2',
    last_name: '李',
    email: 'user1@example.com',
    date_joined: '2024-06-26T11:12:13.789012+08:00',
    username: '用户A',
    degree: '本科',
    blog: 'https://example.com/',
    repo: 'https://github.com/userA',
    resume: 'https://example.com/resume/1-Resume.pdf',
    icon: 'https://pic.imgdb.cn/item/668156d1d9c307b7e934a8c7.jpg',
    tag: [1, 2]
  },
  {
    user_id: 2,
    last_login: '2024-07-02T11:22:33.444555+08:00',
    first_name: '3',
    last_name: '王',
    email: 'user2@example.com',
    date_joined: '2024-06-27T12:13:14.567890+08:00',
    username: '用户B',
    degree: '硕士',
    blog: 'https://example.com/',
    repo: 'https://github.com/userB',
    resume: 'https://example.com/resume/2-Resume.pdf',
    icon: 'https://pic.imgdb.cn/item/668156d0d9c307b7e934a891.jpg',
    tag: [2, 3]
  },
  {
    user_id: 3,
    last_login: '2024-07-03T12:34:56.789012+08:00',
    first_name: '4',
    last_name: '赵',
    email: 'user3@example.com',
    date_joined: '2024-06-28T13:14:15.890123+08:00',
    username: '用户C',
    degree: '博士',
    blog: 'https://example.com/',
    repo: 'https://github.com/userC',
    resume: 'https://example.com/resume/3-Resume.pdf',
    icon: 'https://pic.imgdb.cn/item/668156d0d9c307b7e934a87b.png',
    tag: [3, 4]
  },
  {
    user_id: 4,
    last_login: '2024-07-04T13:45:67.012345+08:00',
    first_name: '5',
    last_name: '钱',
    email: 'user4@example.com',
    date_joined: '2024-06-29T14:15:16.123456+08:00',
    username: '用户D',
    degree: '高中',
    blog: 'https://example.com/',
    repo: 'https://github.com/userD',
    resume: 'https://example.com/resume/4-Resume.pdf',
    icon: 'https://c-ssl.dtstatic.com/uploads/blog/202402/24/ZOSlGldhmVNnw3.thumb.300_0.jpeg_webp',
    tag: [1, 4]
  },
  {
    user_id: 6,
    last_login: '2024-07-06T15:67:89.345678+08:00',
    first_name: '7',
    last_name: '周',
    email: 'user6@example.com',
    date_joined: '2024-07-01T16:17:18.456789+08:00',
    username: '用户F',
    degree: '硕士',
    blog: 'https://example.com/',
    repo: 'https://github.com/userF',
    resume: 'https://example.com/resume/6-Resume.pdf',
    icon: 'https://pic.imgdb.cn/item/66815673d9c307b7e933478d.jpg',
    tag: [1, 3]
  }
]

const staticEnterpriseUserProfile = [
  {
    id: 1,
    is_admin: true,
    work_age: 0,
    job: '',
    user: 5,
    enterprise: 1
  },
  {
    id: 2,
    is_admin: false,
    work_age: 0,
    job: '',
    user: 1,
    enterprise: 1
  },
  {
    id: 3,
    is_admin: true,
    work_age: 0,
    job: '',
    user: 2,
    enterprise: 1
  },
  {
    id: 4,
    is_admin: false,
    work_age: 0,
    job: '',
    user: 3,
    enterprise: 1
  },
  {
    id: 5,
    is_admin: true,
    work_age: 0,
    job: '',
    user: 4,
    enterprise: 1
  },
  {
    id: 6,
    is_admin: false,
    work_age: 0,
    job: '',
    user: 6,
    enterprise: 1
  }
]

const staticEnterpriseUserInfoProfile = [
  {
    user_id: 5,
    last_login: '2024-06-30T15:23:01.480044+08:00',
    first_name: '1',
    last_name: '凯',
    email: '21373078@buaa.edu.cn',
    date_joined: '2024-06-25T14:09:56.940082+08:00',
    username: '网民',
    degree: '高中',
    blog: 'https://git.code.tencent.com/',
    repo: 'https://git.code.tencent.com/',
    resume: 'https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/resume/5-Resume.pdf',
    icon: 'https://2024summer-se-1316618142.cos.ap-beijing.myqcloud.com/icon/enterprise/default.png',
    tag: [4],
    id: 1,
    is_admin: true,
    work_age: 0,
    job: 'CEO',
    user: 5,
    enterprise: 1
  },
  {
    user_id: 1,
    last_login: '2024-07-01T10:20:30.123456+08:00',
    first_name: '2',
    last_name: '李',
    email: 'user1@example.com',
    date_joined: '2024-06-26T11:12:13.789012+08:00',
    username: '用户A',
    degree: '本科',
    blog: 'https://example.com/',
    repo: 'https://github.com/userA',
    resume: 'https://example.com/resume/1-Resume.pdf',
    icon: 'https://pic.imgdb.cn/item/668156d1d9c307b7e934a8c7.jpg',
    tag: [1, 2],
    id: 2,
    is_admin: false,
    work_age: 0,
    job: 'Backend Developer',
    user: 1,
    enterprise: 1
  },
  {
    user_id: 2,
    last_login: '2024-07-02T11:22:33.444555+08:00',
    first_name: '3',
    last_name: '王',
    email: 'user2@example.com',
    date_joined: '2024-06-27T12:13:14.567890+08:00',
    username: '用户B',
    degree: '硕士',
    blog: 'https://example.com/',
    repo: 'https://github.com/userB',
    resume: 'https://example.com/resume/2-Resume.pdf',
    icon: 'https://pic.imgdb.cn/item/668156d0d9c307b7e934a891.jpg',
    tag: [2, 3],
    id: 3,
    is_admin: false,
    work_age: 0,
    job: 'Frontend Developer',
    user: 2,
    enterprise: 1
  },
  {
    user_id: 3,
    last_login: '2024-07-03T12:34:56.789012+08:00',
    first_name: '4',
    last_name: '赵',
    email: 'user3@example.com',
    date_joined: '2024-06-28T13:14:15.890123+08:00',
    username: '用户C',
    degree: '博士',
    blog: 'https://example.com/',
    repo: 'https://github.com/userC',
    resume: 'https://example.com/resume/3-Resume.pdf',
    icon: 'https://pic.imgdb.cn/item/668156d0d9c307b7e934a87b.png',
    tag: [3, 4],
    id: 4,
    is_admin: false,
    work_age: 0,
    job: '扫地工',
    user: 3,
    enterprise: 1
  },
  {
    user_id: 4,
    last_login: '2024-07-04T13:45:67.012345+08:00',
    first_name: '5',
    last_name: '钱',
    email: 'user4@example.com',
    date_joined: '2024-06-29T14:15:16.123456+08:00',
    username: '用户D',
    degree: '高中',
    blog: 'https://example.com/',
    repo: 'https://github.com/userD',
    resume: 'https://example.com/resume/4-Resume.pdf',
    icon: 'https://pic.imgdb.cn/item/66815673d9c307b7e93347bd.jpg',
    tag: [1, 4],
    id: 5,
    is_admin: false,
    work_age: 0,
    job: '零食吞噬者',
    user: 4,
    enterprise: 1
  },
  {
    user_id: 6,
    last_login: '2024-07-06T15:67:89.345678+08:00',
    first_name: '7',
    last_name: '周',
    email: 'user6@example.com',
    date_joined: '2024-07-01T16:17:18.456789+08:00',
    username: '用户F',
    degree: '硕士',
    blog: 'https://example.com/',
    repo: 'https://github.com/userF',
    resume: 'https://example.com/resume/6-Resume.pdf',
    icon: 'https://pic.imgdb.cn/item/66815673d9c307b7e933478d.jpg',
    tag: [1, 3],
    id: 6,
    is_admin: false,
    work_age: 0,
    job: '小馋猫',
    user: 6,
    enterprise: 1
  }
]

// 静态用户动态
const staticEnterprisePost = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    created_at: '2024-06-30T15:40:38.871081+08:00',
    updated_at: '2024-06-30T15:40:38.871081+08:00',
    likes: 10,
    comments: 5,
    is_transfered: false,
    transfered_id: 0,
    username: 'John Doe',
    avatar: 'https://example.com/avatar1.png',
    user_id: '1'
  },
  {
    id: 2,
    title: 'Sed ut perspiciatis unde omnis iste natus error',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    created_at: '2024-06-30T15:40:38.871081+08:00',
    updated_at: '2024-06-30T15:40:38.871081+08:00',
    likes: 15,
    comments: 8,
    is_transfered: false,
    transfered_id: 0,
    username: 'Jane Smith',
    avatar: 'https://example.com/avatar2.png',
    user_id: '2'
  },
  {
    id: 3,
    title: 'At vero eos et accusamus et iusto odio dignissimos',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
    created_at: '2024-06-30T15:40:38.871081+08:00',
    updated_at: '2024-06-30T15:40:38.871081+08:00',
    likes: 20,
    comments: 12,
    is_transfered: false,
    transfered_id: 0,
    username: 'David Johnson',
    avatar: 'https://example.com/avatar3.png',
    user_id: '3'
  },
  {
    id: 4,
    title: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur',
    content:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    created_at: '2024-06-30T15:40:38.871081+08:00',
    updated_at: '2024-06-30T15:40:38.871081+08:00',
    likes: 5,
    comments: 3,
    is_transfered: false,
    transfered_id: 0,
    username: 'Sarah Williams',
    avatar: 'https://example.com/avatar4.png',
    user_id: '4'
  },
  {
    id: 5,
    title: 'Excepteur sint occaecat cupidatat non proident',
    content:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    created_at: '2024-06-30T15:40:38.871081+08:00',
    updated_at: '2024-06-30T15:40:38.871081+08:00',
    likes: 7,
    comments: 2,
    is_transfered: false,
    transfered_id: 0,
    username: 'Michael Brown',
    avatar: 'https://example.com/avatar5.png',
    user_id: '5'
  },
  {
    id: 6,
    title: 'Ut enim ad minima veniam, quis nostrum exercitationem',
    content:
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
    created_at: '2024-06-30T15:40:38.871081+08:00',
    updated_at: '2024-06-30T15:40:38.871081+08:00',
    likes: 3,
    comments: 1,
    is_transfered: false,
    transfered_id: 0,
    username: 'Jessica Davis',
    avatar: 'https://example.com/avatar6.png',
    user_id: '6'
  },
  {
    id: 7,
    title: 'Quis autem vel eum iure reprehenderit qui in ea',
    content:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
    created_at: '2024-06-30T15:40:38.871081+08:00',
    updated_at: '2024-06-30T15:40:38.871081+08:00',
    likes: 9,
    comments: 4,
    is_transfered: false,
    transfered_id: 0,
    username: 'Christopher Wilson',
    avatar: 'https://example.com/avatar7.png',
    user_id: '7'
  },
  {
    id: 8,
    title: 'Sed quia non numquam eius modi tempora incidunt',
    content:
      'Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    created_at: '2024-06-30T15:40:38.871081+08:00',
    updated_at: '2024-06-30T15:40:38.871081+08:00',
    likes: 2,
    comments: 0,
    is_transfered: false,
    transfered_id: 0,
    username: 'Amanda Thompson',
    avatar: 'https://example.com/avatar8.png',
    user_id: '8'
  },
  {
    id: 9,
    title: 'Neque porro quisquam est, qui dolorem ipsum quia',
    content:
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    created_at: '2024-06-30T15:40:38.871081+08:00',
    updated_at: '2024-06-30T15:40:38.871081+08:00',
    likes: 6,
    comments: 3,
    is_transfered: false,
    transfered_id: 0,
    username: 'Daniel Anderson',
    avatar: 'https://example.com/avatar9.png',
    user_id: '9'
  },
  {
    id: 10,
    title: 'Ut enim ad minim veniam, quis nostrud exercitation',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    created_at: '2024-06-30T15:40:38.871081+08:00',
    updated_at: '2024-06-30T15:40:38.871081+08:00',
    likes: 8,
    comments: 2,
    is_transfered: false,
    transfered_id: 0,
    username: 'Emily Martinez',
    avatar: 'https://example.com/avatar10.png',
    user_id: '10'
  }
]

const staticEnterpriseRecruit = [
  {
    recruit_id: 14,
    job_name: '行业运营实习生',
    job_salary: '6-7.5K',
    job_advantage: ['周末双休'],
    job_location: '上海',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T10:28:00.076479+08:00',
    job_needed_people: 6,
    job_request: {
      需求1: '优秀的数据分析和拆解能力，逻辑强、能深入还原事实和发现问题',
      需求2: '善于沟通，具备良好的协作能力，能发现更多业务合作机会'
    },
    job_content: {
      内容1:
        '负责雇主品牌传播的平面设计，输出创意设计方案，包括整体视觉风格呈现、主视觉、海报、H5等',
      内容2: '支持线下实体物料的手绘、平面设计以及IP周边衍生品开发',
      内容3: '完成部门内外部文件、演示文稿的视觉美化',
      内容4: '参与项目前期规划构思、概念传达和创意过程'
    },
    enterprise_name: '美团',
    enterprise_field: '行业运营',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/61/80/619CBC6070EA409410303439DDF9B480.png',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 15,
    job_name: '软件测试工程师',
    job_salary: '20-30K',
    job_advantage: ['五险一金', '购物优惠'],
    job_location: '南京',
    job_day: 5,
    job_month: 2,
    created_at: '2024-06-27T10:28:05.579729+08:00',
    job_needed_people: 5,
    job_request: {
      需求1: '熟悉软件测试流程和测试方法',
      需求2: '有自动化测试经验者优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '美团',
    enterprise_field: '行业运营',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/61/80/619CBC6070EA409410303439DDF9B480.png',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 16,
    job_name: '网络安全工程师',
    job_salary: '18-28K',
    job_advantage: ['技能培训', '项目奖金'],
    job_location: '成都',
    job_day: 4,
    job_month: 3,
    created_at: '2024-06-27T10:28:11.476197+08:00',
    job_needed_people: 6,
    job_request: {
      需求1: '熟悉网络安全协议和防火墙配置',
      需求2: '有渗透测试经验者优先'
    },
    job_content: {
      内容1: '辅助完成公司党务方面的工作；',
      内容2: '辅助完成对发布的资讯内容进行搜集、编辑、校验、发布、维护；',
      内容3: '协助党委办公室的其他工作。'
    },
    enterprise_name: '美团',
    enterprise_field: '行业运营',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/61/80/619CBC6070EA409410303439DDF9B480.png',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 17,
    job_name: '硬件工程师',
    job_salary: '22-32K',
    job_advantage: ['创新文化', '产品内部优惠'],
    job_location: '武汉',
    job_day: 3,
    job_month: 6,
    created_at: '2024-06-27T10:28:17.084555+08:00',
    job_needed_people: 7,
    job_request: {
      需求1: '熟悉电子电路设计和PCB布线',
      需求2: '有嵌入式系统开发经验'
    },
    job_content: {
      内容1:
        '负责小米增长数据分析，包括应用商店，游戏中心等产品的数据驱动、分析相关工作，设计项目目标、北极星指标及拆解指标，分析产品卡点、痛点给出优化策略建议并推动落地，迭代优化；',
      内容2: '负责AB实验中数据指标的设立，跟踪，关键结果的跟踪，并科学获取准确实验结论，',
      内容3:
        '负责业务常规数据的分析，对业务进行阶段性总结、分析，定期出具相关分析报表，为业务提供决策性意见，参与业务专项分析，对用户行为、收入增长、趋势预测等建立相关的分析模型，输出分析报告'
    },
    enterprise_name: '美团',
    enterprise_field: '行业运营',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/61/80/619CBC6070EA409410303439DDF9B480.png',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 51,
    job_name: '虚拟网络研发工程师',
    job_salary: '35-45K',
    job_advantage: ['免费班车', '周末双休'],
    job_location: '深圳',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T12:48:43.610231+08:00',
    job_needed_people: 5,
    job_request: {
      需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
      需求2: '有信创国产化研发和测试经验优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 52,
    job_name: '虚拟网络研发工程师',
    job_salary: '35-45K',
    job_advantage: ['免费班车', '周末双休'],
    job_location: '深圳',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T12:48:52.196045+08:00',
    job_needed_people: 5,
    job_request: {
      需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
      需求2: '有信创国产化研发和测试经验优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 79,
    job_name: '虚拟网络研发工程师',
    job_salary: '35-45K',
    job_advantage: ['免费班车', '周末双休'],
    job_location: '深圳',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T14:39:45.696316+08:00',
    job_needed_people: 5,
    job_request: {
      需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
      需求2: '有信创国产化研发和测试经验优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 80,
    job_name: '虚拟网络研发工程师',
    job_salary: '35-45K',
    job_advantage: ['免费班车', '周末双休'],
    job_location: '深圳',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T14:40:22.828233+08:00',
    job_needed_people: 5,
    job_request: {
      需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
      需求2: '有信创国产化研发和测试经验优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 82,
    job_name: '虚拟网络研发工程师',
    job_salary: '35-45K',
    job_advantage: ['免费班车', '周末双休'],
    job_location: '深圳',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T14:45:03.064229+08:00',
    job_needed_people: 5,
    job_request: {
      需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
      需求2: '有信创国产化研发和测试经验优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 83,
    job_name: '虚拟网络研发工程师',
    job_salary: '35-45K',
    job_advantage: ['免费班车', '周末双休'],
    job_location: '深圳',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T15:07:21.009804+08:00',
    job_needed_people: 5,
    job_request: {
      需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
      需求2: '有信创国产化研发和测试经验优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 84,
    job_name: '虚拟网络研发工程师',
    job_salary: '35-45K',
    job_advantage: ['免费班车', '周末双休'],
    job_location: '深圳',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T15:08:31.035368+08:00',
    job_needed_people: 5,
    job_request: {
      需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
      需求2: '有信创国产化研发和测试经验优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 85,
    job_name: '虚拟网络研发工程师2',
    job_salary: '35-45K',
    job_advantage: ['免费班车', '周末双休'],
    job_location: '深圳',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T15:09:04.549629+08:00',
    job_needed_people: 6,
    job_request: {
      需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
      需求2: '有信创国产化研发和测试经验优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 86,
    job_name: '虚拟网络研发工程师2',
    job_salary: '35-45K',
    job_advantage: ['免费班车', '周末双休'],
    job_location: '深圳',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T15:09:37.963796+08:00',
    job_needed_people: 6,
    job_request: {
      需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
      需求2: '有信创国产化研发和测试经验优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 87,
    job_name: 'aaaaa',
    job_salary: '35-45K',
    job_advantage: ['免费班车', '周末双休'],
    job_location: '深圳',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T15:10:43.235238+08:00',
    job_needed_people: 6,
    job_request: {
      需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
      需求2: '有信创国产化研发和测试经验优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 88,
    job_name: 'aaa',
    job_salary: '35-45K',
    job_advantage: ['免费班车', '周末双休'],
    job_location: '深圳',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-27T15:28:55.191635+08:00',
    job_needed_people: 6,
    job_request: {
      需求1: '熟悉Docker、Kubernetes或者Openstack，并有相关研发和优化经验优先',
      需求2: '有信创国产化研发和测试经验优先'
    },
    job_content: {
      内容1: '协助MA整理材料文献，核对资料等（肺癌）',
      内容2: '深度参与医学部项目，并参会议进行讨论',
      内容3: '在国际化的工作环境中，深入了解医药行业的商业模式和产业结构',
      内容4: '与内外部同事沟通与配合，全方位支持医学部工作运行 任职资格'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [],
    received_resumes: [],
    tag: []
  },
  {
    recruit_id: 103,
    job_name: '测试',
    job_salary: '11',
    job_advantage: ['餐补', '下午茶', '1111', '111'],
    job_location: '111',
    job_day: 1,
    job_month: 1,
    created_at: '2024-06-30T14:41:58.643035+08:00',
    job_needed_people: 6,
    job_request: {},
    job_content: {},
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [1, 2, 3, 7, 9, 10, 11],
    received_resumes: [],
    tag: [
      '前端工程师',
      '后端工程师',
      '全栈工程师',
      '人工智能工程师',
      '大数据工程师',
      '云计算工程师',
      'DevOps工程师'
    ]
  },
  {
    recruit_id: 104,
    job_name: '算法工程师',
    job_salary: '50-70k',
    job_advantage: ['五险一金', '晋升速度快', '带薪年假'],
    job_location: '深圳',
    job_day: 3,
    job_month: 8,
    created_at: '2024-06-30T14:46:16.711826+08:00',
    job_needed_people: 6,
    job_request: {
      需求1: '硕士',
      需求2: '博士'
    },
    job_content: {
      内容1: '大模型服务',
      内容2: '算法设计'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '互联网,生物医学',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [1, 2, 3, 7, 9, 10, 11],
    received_resumes: [],
    tag: [
      '前端工程师',
      '后端工程师',
      '全栈工程师',
      '人工智能工程师',
      '大数据工程师',
      '云计算工程师',
      'DevOps工程师'
    ]
  },
  {
    recruit_id: 105,
    job_name: '厨师',
    job_salary: '10K',
    job_advantage: ['餐补', '可转正实习', '下午茶'],
    job_location: '北京',
    job_day: 1,
    job_month: 12,
    created_at: '2024-06-30T15:49:37.513655+08:00',
    job_needed_people: 6,
    job_request: {
      需求1: '本科'
    },
    job_content: {
      内容1: '炒菜',
      内容2: '做饭'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '生物医学',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [1, 2, 3, 7, 9, 10, 11],
    received_resumes: [4],
    tag: [
      '前端工程师',
      '后端工程师',
      '全栈工程师',
      '人工智能工程师',
      '大数据工程师',
      '云计算工程师',
      'DevOps工程师'
    ]
  },
  {
    recruit_id: 106,
    job_name: '会计',
    job_salary: '20K',
    job_advantage: ['五险一金'],
    job_location: '北京',
    job_day: 5,
    job_month: 6,
    created_at: '2024-06-30T20:57:30.206711+08:00',
    job_needed_people: 6,
    job_request: {
      需求1: '本科及以上'
    },
    job_content: {
      内容1: '算账'
    },
    enterprise_name: '哇哦互联',
    enterprise_field: '行业运营',
    enterprise_icon: 'https://sxsimg.xiaoyuanzhao.com/2B/EE/2BFD5C732B853B5ACAE0CB397EEC99EE.jpeg',
    enterprise: 16,
    job_interested_id: [1, 2, 3, 7, 9, 10, 11],
    received_resumes: [],
    tag: [
      '前端工程师',
      '后端工程师',
      '全栈工程师',
      '人工智能工程师',
      '大数据工程师',
      '云计算工程师',
      'DevOps工程师'
    ]
  }
]

const axios_instance = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  headers: { Authorization: token }
})

const getUserInfo = async (user_id) => {
  if (token == null) return null
  const res = await axios_instance.get('/api/user/detail')
  return res.data || staticUser
}
const getUserProfile = async () => {
  // Code to handle successful API call
  const userInfo = await getUserInfo()
  const user_id = userInfo.user_id
  const res = await axios_instance.get('/api/profile?user_id=' + user_id)
  return res.data || staticUserProfile
}
const getEnterpriseInfo = async (enterprise_id) => {
  const res = await axios_instance.get('/api/enterprise/info?enterprise_id=' + enterprise_id)
  return res.data || staticEnterpriseInfo
}

const getEnterpriseUserInfo = async () => {
  const res = await axios_instance.get('/api/profile/list')
  return res.data.data || staticEnterpriseUserInfoPre.data
}

const getEnterpriseUserPost = async (enterprise_id) => {
  const res = await axios_instance.get('/api/tweet/get_enterprise?enterprise_id=' + enterprise_id)
  return res.data || staticEnterprisePost
}

const getEnterpriseUserInfoProfile = async () => staticEnterpriseUserInfoProfile

const getEnterpriseRecruit = async (enterprise_id) => staticEnterpriseRecruit

export {
  getUserInfo,
  getUserProfile,
  getEnterpriseInfo,
  getEnterpriseUserInfo,
  getEnterpriseUserPost,
  getEnterpriseUserInfoProfile,
  getEnterpriseRecruit
}

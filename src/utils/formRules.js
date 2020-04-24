
import {
  validateAcc,
  validateUrl,
  validateUrlImg,
  validateNum,
  validatePass,
  validateNumNoRequire,
  isEven,
  bonusValidate
} from '@/utils/formValidate'

const BonusRules = [
  { validator: bonusValidate, required: true, message: '请输入1800〜1960的数值', trigger: 'blur' },
  { validator: isEven, message: '只接受偶数', trigger: 'blur' }
]

const formRules = {

  role: {
    agentID: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    roleName: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    remark: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ]
  },

  managerList: {
    agentID: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    roleID: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    account: [
      { required: true, message: '帐号不得为空白', trigger: 'blur' },
      { validator: validateAcc, trigger: 'blur' },
      { max: 16, min: 4, message: '帐号长度在 4 ~ 16 个字符之内', trigger: 'blur' }
    ],
    password: [
      { validator: validatePass, trigger: 'blur' },
      { required: true, message: '密码不得为空白', trigger: 'blur' },
      { max: 20, min: 6, message: '密码长度在 6 ~ 20 个字符之内', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '不得为空白', trigger: 'change' }
    ]
  },

  lotteryOpen: {
    lotteryName: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    gameCategoryID: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    code: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    sort: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    median: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    popular: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    repeat: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    official: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    url: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    remark: []
  },

  activityRule: {
    activityID: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    continuousDays: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    totalDays: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    dailyDeposit: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    reward: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    dailyValidAmount: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    remark: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ]
  },

  activitySetting: {
    name: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    sort: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    type: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    subType: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    startTime: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    endTime: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    showStartTime: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    showEndTime: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    userType: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    getAwardTimes: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    carouselSort: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    titlePcUrl: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateUrlImg, required: true, message: '请输入正确的图片路径', trigger: 'blur' }
    ],
    titleMobileUrl: [
      { validator: validateUrlImg, required: true, message: '请输入正确的图片路径', trigger: 'blur' }
    ],
    detailPcUrl: [
      { validator: validateUrlImg, required: true, message: '请输入正确的图片路径', trigger: 'blur' }
    ],
    detailMobileUrl: [
      { validator: validateUrlImg, required: true, message: '请输入正确的图片路径', trigger: 'blur' }
    ],
    indexPcUrl: [
      { validator: validateUrlImg, required: true, message: '请输入正确的图片路径', trigger: 'blur' }
    ],
    indexMobileUrl: [
      { validator: validateUrlImg, required: true, message: '请输入正确的图片路径', trigger: 'blur' }
    ],
    memberCenterMobileUrl: [
      { validator: validateUrlImg, required: true, message: '请输入正确的图片路径', trigger: 'blur' }
    ],
    activityID: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    continuousDays: [
      { validator: validateNumNoRequire, message: '仅接受数字', trigger: 'blur' }
    ],
    totalDays: [
      { validator: validateNumNoRequire, message: '仅接受数字', trigger: 'blur' }
    ],
    dailyDeposit: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    reward: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    dailyValidAmount: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    remark: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    ruleRemark: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ]
  },

  carouselSetting: {
    name: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    sort: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    startTime: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    endTime: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    indexPcUrl: [
      { validator: validateUrlImg, required: true, message: '请输入正确的图片路径', trigger: 'blur' }
    ],
    indexMobileUrl: [
      { validator: validateUrlImg, required: true, message: '请输入正确的图片路径', trigger: 'blur' }
    ],
    memberCenterMobileUrl: [
      { validator: validateUrlImg, required: true, message: '请输入正确的图片路径', trigger: 'blur' }
    ]
  },

  offlineRecord: {
    status: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ]
  },

  paymentSetting: {
    paymentLevels: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    channel: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    platform: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    merchantNum: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    merchantNum2: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    key: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    url: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    notifyURL: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    min: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    max: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    discount: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ]
  },

  withdrawalRecord: {
    status: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ]
  },

  lotteryNum: {
    // status: [
    //   { required: true, message: '不得为空白', trigger: 'blur' },
    // ]
  },

  agentList: {
    account: [
      { required: true, message: '帐号不得为空白', trigger: 'blur' },
      { validator: validateAcc, trigger: 'blur' },
      { max: 16, min: 4, message: '帐号长度在 4 ~ 16 个字符之内', trigger: 'blur' }
    ],
    password: [
      { validator: validatePass, trigger: 'blur' },
      { required: true, message: '密码不得为空白', trigger: 'blur' },
      { max: 20, min: 6, message: '密码长度在 6 ~ 20 个字符之内', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    userDomain: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    adminDomain: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    updateBalanceUrl: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateUrl, required: true, message: '仅接受网址', trigger: 'blur' }
    ],
    remark: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    gameType: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    walletMode: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    getBalanceUrl: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateUrl, required: true, message: '仅接受网址', trigger: 'blur' }
    ]
  },

  bill: {
    // remark: [
    //   { required: true, message: '不得为空白', trigger: 'blur' },
    // ]
  },

  announcement: {
    title: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    content: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    showMarquee: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    startTime: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    endTime: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ]
  },

  systemConfig: {
    name: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    key: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    value: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ]
  },

  userList: {
    account: [
      { required: true, message: '帐号不得为空白', trigger: 'blur' },
      { validator: validateAcc, trigger: 'blur' },
      { max: 16, min: 4, message: '帐号长度在 4 ~ 16 个字符之内', trigger: 'blur' }
    ],
    password: [
      { validator: validatePass, trigger: 'blur' },
      { required: true, message: '密码不得为空白', trigger: 'blur' },
      { max: 20, min: 6, message: '密码长度在 6 ~ 20 个字符之内', trigger: 'blur' }
    ],
    confirmPassword: [
      { validator: validatePass, trigger: 'blur' },
      { required: true, message: '不得为空白', trigger: 'blur' },
      { max: 20, min: 6, message: '密码长度在 6 ~ 20 个字符之内', trigger: 'blur' }
    ],
    amount: [
      { required: true, message: '不得为空白', trigger: 'blur' },
      { validator: validateNum, required: true, message: '仅接受数字', trigger: 'blur' }
    ],
    isAgent: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    isTest: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    rebate: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ]
  },

  maintainRecord: {
    startTime: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    endTime: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    agentID: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '不得为空白', trigger: 'blur' }
    ]
  }

}

const addBonusRules = () => {
  const bonusItem = [1, 65, 113, 229, 251, 271, 298, 334, 621]
  for (const item of bonusItem) {
    formRules[`bonus${item}`] = BonusRules
  }
}

addBonusRules()

export default formRules

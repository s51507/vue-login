export const validateAcc = (rule, value, callback) => {
  const accRegxp = /^[a-zA-Z0-9_]+$/i
  if (!accRegxp.test(value)) {
    callback(new Error('请输入英文或数字'))
  } else {
    callback()
  }
}
export const validateName = (rule, value, callback) => {
  const nameRegxp = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
  if (!nameRegxp.test(value)) {
    callback(new Error('请输入中英文或数字'))
  } else {
    callback()
  }
}
export const validatePass = (rule, value, callback) => {
  const pwRegxp = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,20}$/
  if (!pwRegxp.test(value)) {
    callback(new Error('请输入6～20个字，且是英文及数字组合'))
  } else {
    callback()
  }
}

export const validateNum = (rule, value, callback) => {
  const pwRegxp = /^[0-9]+$/i
  if (!pwRegxp.test(value)) {
    callback(new Error('请输入数字'))
  } else {
    callback()
  }
}

export const validateNumNoRequire = (rule, value, callback) => {
  const pwRegxp = /^[0-9]+$/i
  if (!value) return callback()
  if (!pwRegxp.test(value) && value !== '') {
    callback(new Error('请输入数字'))
  } else {
    callback()
  }
}

export const validate127 = (rule, value, callback) => {
  const pwRegxp = /^[0-127]+$/i
  if (!pwRegxp.test(value)) {
    callback(new Error('请输入数字'))
  } else {
    callback()
  }
}
export const validateUrlImg = (rule, value, callback) => {
  // eslint-disable-next-line no-useless-escape
  const pwRegxp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+\.(?:jpg|gif|png)+$/i
  if (!pwRegxp.test(value)) {
    callback(new Error('请输入正确的图片路径'))
  } else {
    callback()
  }
}

export const validateUrl = (rule, value, callback) => {
  // eslint-disable-next-line no-useless-escape
  const pwRegxp = /^(http?|https):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]$/i
  if (!pwRegxp.test(value)) {
    callback(new Error('请输入正确的网址'))
  } else {
    callback()
  }
}

export const validateAmount = (rule, value, callback) => {
  const pwRegxp = /^[0-9]+(\.[0-9]{1,3})?$/i
  if (!pwRegxp.test(value)) {
    callback(new Error('请输入数字或小数第三位'))
  } else if (value <= 0) {
    callback(new Error('金额需大于零'))
  } else {
    callback()
  }
}

export const isEven = (rule, value, callback) => {
  if (+value % 2 === 0) callback()
  else callback(new Error('只接受偶数'))
}

export const bonusValidate = (rule, value, callback) => {
  const acceptRange = Boolean(+value >= 1800 && +value <= 1960)
  if (acceptRange) callback()
  else callback(new Error('请输入1800〜1960的数值'))
}

export default {
  validateAcc,
  validateName,
  validatePass,
  validateNum,
  validate127,
  isEven,
  bonusValidate,
  validateNumNoRequire,
  validateUrlImg,
  validateUrl
}

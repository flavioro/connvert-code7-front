import yup from './validator'

const userValidator = yup.object().shape({
  name: yup.string().required().max(150).min(1),
  email: yup.string().required().email().max(200).min(5),
  password: yup.string().required().max(50).min(8)
})

export const loginValidator = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().max(50).min(8)
})

export default userValidator

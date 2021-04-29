import yup from './validator'

const debtValidator = yup.object().shape({
  description: yup.string().required().min(1).max(200).typeError('campo motivo é obrigatório'),
  client_id: yup.number().required(),
  date: yup.date().required().typeError('campo data é obrigatório'),
  value: yup.number().required().min(0.1)
})
export default debtValidator

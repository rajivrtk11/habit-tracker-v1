import { toast } from 'react-toastify';

export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const displayError = (error,id=undefined) => {
    const errMessage =  error.response?.data ? error.response.data.message : error.message
    if (id) {
        return toast.error(errMessage,{toastId: id})
    }
    return toast.error(errMessage)
}
export const validateSchema = (schema, validationObject) => {
  const { error } = schema.validate(validationObject);
    if (error) {
      toast.error(error.message)
      return false;
    }
    return true;  
};
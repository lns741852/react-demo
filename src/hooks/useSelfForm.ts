import { useRef} from 'react';
import  {type FormInstance } from 'antd';


const useSelfForm = () => {
  const formRef = useRef<FormInstance>(null);
  return { formRef };
};

export default useSelfForm;
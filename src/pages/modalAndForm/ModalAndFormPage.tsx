import { useEffect } from 'react';
import UserForm from '../../components/UserForm';
import { Button, Modal } from 'antd';
import useSelfModalFrom from '../../hooks/useSelfModalForm';
import { useAppSelector } from '../../app/store/hooks';



const ModalAndFormPage: React.FC = () => {

  const { isModalOpen, openModal, closeModal, handleOk, formRef } = useSelfModalFrom()
  const user = useAppSelector((state) => state.user);


  useEffect(() => {
    if (isModalOpen) {
      formRef.current && formRef.current.setFieldsValue({
        name: '小明',
        age: 20,
        interest: ['eat', 'drink'],
      });
    }
  }, [isModalOpen]);

  console.log(user)

  return (
    <div>
      <Modal
        open={isModalOpen}
        onOk={() => handleOk()}
        onCancel={closeModal}
      >
        <UserForm ref={formRef} />
      </Modal>

      <Button onClick={openModal} type="primary" style={{ marginTop: 16 }}>
        開啟
      </Button>
    </div>
  );
};

export default ModalAndFormPage;
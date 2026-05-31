import { useState } from "react";
import useSelfForm from "./useSelfForm";

const useSelfModalFrom = () => {
  const { formRef } = useSelfForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOk = async (doAction?: () => Promise<void> | void) => {
    try {
      const values = await formRef.current?.validateFields();
      console.log("表單資料:", values);

      doAction && (await doAction());

      closeModal();
    } catch (error) {
      console.error("驗證失敗:", error);
    }
  };

  return { isModalOpen, openModal, closeModal, handleOk, formRef };
};

export default useSelfModalFrom;

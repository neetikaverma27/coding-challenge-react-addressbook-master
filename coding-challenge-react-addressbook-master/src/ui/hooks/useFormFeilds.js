import { useState } from "react";

const useFormFields = (initialValue) => {
  const [fields, setFields] = useState(initialValue);

  const handleFieldChange = (event) => {
    const feildEvent = event.target;
    setFields({
      ...fields,
      [feildEvent.name]: feildEvent.value,
    });
  };

  const resetFields = () => {
    setFields(initialValue);
  };

  return [fields, handleFieldChange, resetFields];
};

export default useFormFields;

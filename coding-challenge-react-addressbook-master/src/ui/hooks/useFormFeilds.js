import React, { useState, useEffect } from "react";

const useFormFields = (initialValue) => {
  const [fields, setFields] = useState(initialValue);

  const handleFeildChange = (event) => {
    const feildEvent = event.target;
    setFields({
      ...fields,
      [feildEvent.name]: feildEvent.value,
    });
  };

  const resetFields = () => {
    setFields(initialValue);
  };

  return [fields, handleFeildChange, resetFields];
};

export default useFormFields;

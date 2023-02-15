import React from "react";
import transformAddress from "../../core/models/address";

const fetchAddress = async (postCode, houseNumber) => {
  const response = await fetch(
    `/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.errormessage);
  }

  return data;
};

export const useFetchAddresses = () => {
  const [addresses, setAddresses] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getAddresses = async (postCode, houseNumber) => {
    try {
      setIsLoading(true);
      const response = await fetchAddress(postCode, houseNumber);
      setAddresses(response.details.map(transformAddress));
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  return [addresses, setAddresses, getAddresses, isLoading];
};

export default useFetchAddresses;

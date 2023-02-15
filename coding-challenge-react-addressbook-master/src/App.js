import React, { useEffect, useCallback } from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Loader from "./ui/components/Loader/Loader";
import Section from "./ui/components/Section/Section";
import useAddressBook from "./ui/hooks/useAddressBook";
import useFormFeilds from "./ui/hooks/useFormFields";
import useFetchAddresses from "./ui/hooks/useFetchAddresses";
import Form from "./ui/components/Form/Form";
import * as styles from "../styles/App.module.css";

const formFieldNames = {
  postCode: "postCode",
  houseNumber: "houseNumber",
  firstName: "firstName",
  lastName: "lastName",
  selectedAddress: "selectedAddress",
};

function App() {
  /**
   * Form fields states
   * DONE: TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { postCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handlePostCodeChange for example
   */

  const [fields, handleFieldChange, resetForm] = useFormFeilds({
    [formFieldNames.postCode]: "",
    [formFieldNames.houseNumber]: "",
    [formFieldNames.firstName]: "",
    [formFieldNames.lastName]: "",
    [formFieldNames.selectedAddress]: "",
  });

  const { postCode, houseNumber, firstName, lastName, selectedAddress } =
    fields;

  const [error, setError] = React.useState("");

  const [addresses, setAddresses, getAddresses, isLoading] =
    useFetchAddresses();

  const { addAddress } = useAddressBook();
  const clearField = useCallback(() => {
    resetForm();
    setAddresses([]);
  }, [resetForm, setAddresses]);

  useEffect(() => {
    if (addresses.length > 0) {
      setError("");
    }
  }, [addresses, setError, postCode, houseNumber]);

  useEffect(() => {
    if (error !== "") {
      // reset all the fetched values
      setAddresses([]);
    }
  }, [error]);

  /**DONE TODO: Fetch addresses based on houseNumber and postCode using the local BE api
   * - Example URL of API: /api/getAddresses?postcode=1345&streetnumber=350
   * - Handle errors if they occur
   * - Handle successful response by updating the `addresses` in the state using `setAddresses`
   * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
   * - Bonus: Add a loading state in the UI while fetching addresses
   */
  const handleAddressSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await getAddresses(postCode, houseNumber);
      } catch (error) {
        setError(error.message);
      }
    },
    [postCode, houseNumber, setAddresses, setError]
  );

  const handlePersonSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!selectedAddress || !addresses.length) {
        setError(
          "No address selected, try to select an address or find one if you haven't"
        );
        return;
      }

      const foundAddress = addresses.find(
        (address) => address.id === selectedAddress
      );

      addAddress({ ...foundAddress, firstName, lastName });
    },
    [setError, addAddress, firstName, lastName, addresses, selectedAddress]
  );

  return (
    <main>
      {isLoading && <Loader />}
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        {/* DONE TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        <Form
          legend="🏠 Find an address"
          onSubmit={handleAddressSubmit}
          buttonText="Find"
          variant="primary"
        >
          <InputText
            name={formFieldNames.postCode}
            onChange={handleFieldChange}
            placeholder="Post Code"
            value={postCode}
          />
          <InputText
            name={formFieldNames.houseNumber}
            onChange={handleFieldChange}
            value={houseNumber}
            placeholder="House number"
          />
        </Form>

        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name={formFieldNames.selectedAddress}
                id={address.id}
                key={address.id}
                onChange={handleFieldChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* DONE TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {selectedAddress !== "" && error === "" && (
          <Form
            legend="✏️ Add personal info to address"
            onSubmit={handlePersonSubmit}
            buttonText="Add to addressbook"
            variant="primary"
          >
            <InputText
              name={formFieldNames.firstName}
              onChange={handleFieldChange}
              placeholder="First name"
              value={firstName}
            />
            <InputText
              name={formFieldNames.lastName}
              onChange={handleFieldChange}
              value={lastName}
              placeholder="Last name"
            />
          </Form>
        )}

        {/* DONE TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <div className={styles.error}>{error}</div>}

        {/* DONE TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        <Button onClick={clearField} variant="secondary">
          Clear all feilds
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;

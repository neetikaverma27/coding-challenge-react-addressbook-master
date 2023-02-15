import React, { useEffect } from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import useFormFeilds from "./ui/hooks/useFormFeilds";
import Form from "./ui/components/Form/Form";
import * as styles from "../styles/App.module.css";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { postCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handlePostCodeChange for example
   */
  const [fields, handleFeildChange, resetForm] = useFormFeilds({
    postCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });
  const { postCode, houseNumber, firstName, lastName, selectedAddress } =
    fields;
  // const [postCode, setPostCode] = React.useState("");
  // const [houseNumber, setHouseNumber] = React.useState("");
  // const [firstName, setFirstName] = React.useState("");
  // const [lastName, setLastName] = React.useState("");
  //const [selectedAddress, setSelectedAddress] = React.useState("");
  /**
   * Results states
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  /**
   * Text fields onChange handlers
   */
  // const handlePostCodeChange = (e) => setPostCode(e.target.value);

  // const handleHouseNumberChange = (e) => setHouseNumber(e.target.value);

  // const handleFirstNameChange = (e) => setFirstName(e.target.value);

  // const handleLastNameChange = (e) => setLastName(e.target.value);

  // const handleSelectedAddressChange = (e) => setSelectedAddress(e.target.value);

  useEffect(() => {
    setError("");
  }, [addresses, setError]);

  const fetchAddress = async (postCode, houseNumber) => {
    try {
      const response = await fetch(
        `/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errormessage);
      } else {
        setAddresses(data.details.map(transformAddress));
        console.log(data);
      }
    } catch (error) {
      setError(error.message);
      console.log("ERROR", error);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    fetchAddress(postCode, houseNumber);

    /** TODO: Fetch addresses based on houseNumber and postCode using the local BE api
     * - Example URL of API: /api/getAddresses?postcode=1345&streetnumber=350
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
  };

  const handlePersonSubmit = (e) => {
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
  };

  // const resetForm = () => {
  //   setPostCode("");
  //   setHouseNumber("");
  //   setAddresses("");
  //   setFirstName("");
  //   setLastName("");
  //   setSelectedAddress("");
  // };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        <Form
          legend="🏠 Find an address"
          onSubmit={handleAddressSubmit}
          buttonText="Find"
          variant="primary"
        >
          <InputText
            name="postCode"
            onChange={handleFeildChange}
            placeholder="Post Code"
            value={postCode}
          />
          <InputText
            name="houseNumber"
            onChange={handleFeildChange}
            value={houseNumber}
            placeholder="House number"
          />
        </Form>

        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleFeildChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {selectedAddress && (
          <Form
            legend="✏️ Add personal info to address"
            onSubmit={handlePersonSubmit}
            buttonText="Add to addressbook"
            variant="primary"
          >
            <InputText
              name="firstName"
              onChange={handleFeildChange}
              placeholder="First name"
              value={firstName}
            />
            <InputText
              name="lastName"
              onChange={handleFeildChange}
              value={lastName}
              placeholder="Last name"
            />
          </Form>
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <div className={styles.error}>{error}</div>}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        <Button onClick={resetForm} variant="secondary">
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

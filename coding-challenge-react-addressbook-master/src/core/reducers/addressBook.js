const defaultState = {
  addresses: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "address/add":
      /** TODO: Prevent duplicate addresses */
      const { payload: address } = action;
      const doesAddressExist = state.addresses.some((existing) => {
        return existing.id === address.id;
      });

      if (doesAddressExist === true) {
        return state;
      }
      return { ...state, addresses: [...state.addresses, address] };
    case "address/remove":
      /** TODO: Write a state update which removes an address from the addresses array. */
      const filteredArray = state.addresses.filter(
        (existing) => existing.id !== action.payload
      );
      return { ...state, addresses: filteredArray };
    case "addresses/add": {
      return { ...state, addresses: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;

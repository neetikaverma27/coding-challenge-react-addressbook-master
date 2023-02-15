import type { NextApiRequest, NextApiResponse } from "next";

import generateMockAddresses from "../../src/utils/generateMockAddresses";

const integerValidation = (value: string, paramName: string) => {
  const parsedValue = parseInt(value);

  if (isNaN(parsedValue)) {
    throw new Error(`${paramName} must be all digits!`);
  }
};

const mandatoryValidation = (value: string) => {
  if (!value) {
    throw new Error(`Postcode and street number fields mandatory!`);
  }
};

const lengthValidation = (value: string) => {
  if (value.length < 4) {
    throw new Error(`Postcode must be at least 4 digits!`);
  }
};

/**
 * As an author of this API we are aware of what would be the shape of our query parameters.
 * NextApiRequest - defines
 */
interface AddressRequest extends NextApiRequest {
  query: {
    postcode: string;
    streetnumber: string;
  };
}

export default async function handle(
  req: AddressRequest,
  res: NextApiResponse
) {
  const {
    query: { postcode, streetnumber },
  } = req;

  if (!postcode || !streetnumber) {
    return res.status(400).send({
      status: "error",
      errormessage: "Postcode and street number fields mandatory!",
    });
  }

  if (postcode.length < 4) {
    return res.status(400).send({
      status: "error",
      errormessage: "Postcode must be at least 4 digits!",
    });
  }

  /** DONE: TODO: Refactor the code below so there is no duplication of logic for postCode/streetNumber digit checks. */

  try {
    const postCode = integerValidation(postcode, "Postcode");
    const streetNumber = integerValidation(streetnumber, "Street number");
    const mockAddresses = generateMockAddresses(postcode, streetnumber);

    if (mockAddresses) {
      return res.status(200).json({
        status: "ok",
        details: mockAddresses,
      });
    }

    return res.status(404).json({
      status: "error",
      errormessage: "No results found!",
    });
  } catch (error: unknown) {
    return res.status(400).send({
      status: "error",
      errormessage: (error as Error).message,
    });
  }
}

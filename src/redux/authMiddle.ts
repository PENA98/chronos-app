import {
  setIsValidPassword,
  setIsValidEmail,
  setIsRequired,
} from "./authSlice";
import { client } from "../graphql/client";
import { SignupUserInput } from "../graphql/generated";
export const authMiddle = (store: any) => (next: any) => async (
  action: any
) => {
  switch (action.type) {
    case "auth/handleSignUp":
      console.log("Desde el middle", action.payload);
      const data = action.payload;
      interface userInterface {
        name: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
      }

      const userObject = {
        name: data.get("firstName")?.toString()!,
        lastName: data.get("lastName")?.toString()!,
        username: data.get("username")?.toString()!,
        email: data.get("email")?.toString()!,
        password: data.get("password")?.toString()!,
        confirmPassword: data.get("confirmPassword")?.toString()!,
      } as userInterface;

      console.log(" desde la data", userObject);
      const isValid = {
        valid: await checkPasswordValidity(userObject.password || ""),
        confirmPasswordValidity:
          userObject.confirmPassword === userObject.password ? true : false,
      };
      const validEmail = validateEmail(userObject.email);
      console.log(isValid);
      store.dispatch(setIsValidPassword(isValid));
      store.dispatch(setIsValidEmail(validEmail));

      for (const key in userObject) {
        if (
          userObject[key as keyof typeof userObject] === undefined ||
          userObject[key as keyof typeof userObject] === ""
        ) {
          console.log(key);
          store.dispatch(setIsRequired(`${key} is required`));
        } else {
        }
      }

      if (
        isValid.valid === null &&
        isValid.confirmPasswordValidity &&
        validEmail &&
        (userObject.name != undefined || "") &&
        (userObject.lastName != undefined || "") &&
        (userObject.username != undefined || "")
      ) {
        try {
          const signupUserInput: SignupUserInput = {
            name: userObject.name,
            lastname: userObject.lastName,
            username: userObject.username,
            email: userObject.email,
            password: userObject.password,
            confirmPassword: userObject.confirmPassword,
          };

          const response = await client.mutation({
            signup: [{ signupUserInput }, { username: true, _id: true }],
          });

          console.log(response);
        } catch (error) {
          console.error("error al guardar", error);
        }
      }
      break;

    case "auth/setShowPassword":
      break;

    default:
      break;
  }
  return next(action);
};

const checkPasswordValidity = async (value: string) => {
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    return "Password must not contain Whitespaces.";
  }

  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(value)) {
    return "Password must have at least one Uppercase Character.";
  }

  const isContainsLowercase = /^(?=.*[a-z]).*$/;
  if (!isContainsLowercase.test(value)) {
    return "Password must have at least one Lowercase Character.";
  }

  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (!isContainsNumber.test(value)) {
    return "Password must contain at least one Digit.";
  }

  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/;
  if (!isContainsSymbol.test(value)) {
    return "Password must contain at least one Special Symbol.";
  }

  const isValidLength = /^.{6,16}$/;
  if (!isValidLength.test(value)) {
    return "Password must be 6-16 Characters Long.";
  }

  return null;
};

const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

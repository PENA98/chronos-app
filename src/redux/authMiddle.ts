import {
  setIsValidPassword,
  setIsValidEmail,
  setIsRequired,
  setShowPassword,
  setLoginError,
  setLoginSuccess,
} from "./authSlice";
import { client } from "../graphql/client";
import { LoginUserInput, SignupUserInput } from "../graphql/generated";

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

          const response = await client
            .mutation({
              signup: [{ signupUserInput }, { username: true, _id: true }],
            })
            .then((res) => {
              console.log(res);
              store.dispatch(setIsRequired(""));
              store.dispatch(setShowPassword(false));
              window.location.replace("#");
            });

          console.log(response);
          store.dispatch(setIsRequired(""));
          store.dispatch(setShowPassword(false));
        } catch (error: any) {
          console.log("error al guardar",  error.message.split("\n")[0]);
          store.dispatch(setIsRequired(error.message.split("\n")[0]));
        }
      }
      break;

    case "auth/handleSignIn":
      const signInData = action.payload;
      const signInObject = {
        username: signInData.get("username")?.toString()!,
        password: signInData.get("password")?.toString()!,
      };
      console.log("signInObject", signInObject);

      for (const key in signInObject) {
        if (
          signInObject[key as keyof typeof signInObject] === undefined ||
          signInObject[key as keyof typeof signInObject] === ""
        ) {
          console.log(key);
          store.dispatch(setIsRequired(`${key} is required`));
        } else {
        }
      }

      if (
        signInObject.username != undefined ||
        ("" && signInObject.password != undefined) ||
        ""
      ) {
        try {
          const LoginUserInput: LoginUserInput = {
            username: signInObject.username,
            password: signInObject.password,
          };

          const response = await client
            .mutation({
              login: [
                { LoginUserInput },
                {
                  user: {
                    _id: true,
                    username: true,
                    name: true,
                    lastname: true,
                  },
                  accessToken: true,
                },
              ],
            })
            .then((res) => {
              store.dispatch(setIsRequired(""));
              store.dispatch(setLoginError(""));
              store.dispatch(setShowPassword(false));
              const now = new Date();
              store.dispatch(setLoginSuccess(true));
              localStorage.setItem(
                "authed",
                JSON.stringify({
                  ...res.login,
                  expires: now.getTime() + 14400000,
                })
              );
              console.log(res.login);
              window.location.replace("#");
            });
        } catch (error: any) {
          console.log(
            "error al guardar",
            JSON.parse(error.message.split("\n")[0])
          );
          store.dispatch(setIsRequired(""));
          store.dispatch(
            setLoginError(JSON.parse(error.message.split("\n")[0]).message)
          );
        }
      }

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

export const appMiddle = (store: any) => (next: any) => async (action: any) => {
  switch (action.type) {
    case "app":
      break;

    default:
      break;
  }
  return next(action);
};

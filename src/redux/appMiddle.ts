import { client } from "../graphql/client";
import { createCollectionInput } from "../graphql/generated";
import axios from "axios";
import {
  handleGetCollections,
  setCollections,
  setImage,
  setCollectionError,
  setCollectionImage,
  setSuccessSaving,
} from "./appSlice";

export const appMiddle = (store: any) => (next: any) => async (action: any) => {
  const { appReducer } = store.getState();
  switch (action.type) {
    case "app/handleNewCollection":
      console.log("Desde el middle", action.payload);

      if (
        action.payload.name !== "" &&
        action.payload.name !== undefined &&
        action.payload.description !== "" &&
        action.payload.description !== undefined &&
        appReducer.image !== null
      ) {
        try {
          console.log("Desde el middle", store.getState());
          const { appReducer, authReducer } = store.getState();
          const file = new FormData();
          file.append("file", appReducer.image);
          console.warn("File", appReducer.image);
          const url = "http://localhost:3000/uploadImage";

          axios
            .post(url, file)
            .then((res) => {
              const createCollectionInput: createCollectionInput = {
                name: action.payload.name,
                description: action.payload.description,
                image: `http://localhost:3000/${res.data.imagePath}`,
                userID: authReducer.isAuthed.user._id,
                createdAt: new Date(),
                updatedAt: new Date(),
              };

              const response = client.mutation({
                createCollection: [
                  { createCollectionInput },
                  {
                    _id: true,
                    name: true,
                    description: true,
                    image: true,
                    userID: true,
                    createdAt: true,
                    updatedAt: true,
                  },
                ],
              });

              console.log(response);
              console.log("res", res);
            })
            .then(() => {
              store.dispatch(handleGetCollections({}));
              store.dispatch(setImage(null));
              store.dispatch(setCollectionImage(""));
              store.dispatch(setSuccessSaving(true));
              store.dispatch(setCollectionError(""));
            });
        } catch (error) {
          console.error("error al guardar", error);
        }
      } else {
        store.dispatch(setCollectionError("All fields are required"));
        store.dispatch(setSuccessSaving(false));
      }

      break;

    case "app/handleGetCollections":
      const { authReducer } = store.getState();
      const userID = authReducer.isAuthed.user._id;
      const response = await client.query({
        getUserCollections: [
          { userID },
          {
            _id: true,
            name: true,
            description: true,
            image: true,
            userID: true,
            createdAt: true,
            updatedAt: true,
          },
        ],
      });
      console.log(response.getUserCollections);
      store.dispatch(setCollections(response.getUserCollections));
      break;

    case "app/deleteCollectionHandler":
      console.log("delete collection", action.payload);

      try {
        const response = await client.mutation({
          deleteCollection: [{ _id: action.payload }, { _id: true }],
        });
        store.dispatch(handleGetCollections({}));
        console.log(response);
      } catch (error) {
        store.dispatch(handleGetCollections({}));
        console.log("error", error);
      }

      break;

    case "app/handleCollectionEdit":
      console.log("Desde el middle", action.payload);
      console.log("nosta", appReducer.image);

      if (
        action.payload.name !== "" &&
        action.payload.name !== undefined &&
        action.payload.description !== "" &&
        action.payload.description !== undefined 
      ) {
        try {
          console.log("Desde el middle", store.getState());
          const file = new FormData();
          file.append("file", appReducer.image);
          console.warn("File", appReducer.image);
          const url = "http://localhost:3000/uploadImage";
          console.log("url", appReducer.image);

          if (appReducer.image === null) {
            const updateObject = action.payload;
            const response = await client
              .mutation({
                updateCollection: [
                  { updateCollectionInput: updateObject },
                  { _id: true },
                ],
              }).finally(() => {
                store.dispatch(handleGetCollections({}));
                store.dispatch(setImage(null));
                store.dispatch(setCollectionImage(""));
                store.dispatch(setSuccessSaving(true));
                store.dispatch(setCollectionError(""));
              });
              console.log("response", response);
          } else {
            axios
              .post(url, file)
              .then((res) => {
                const updateObject = {
                  ...action.payload,
                  image: `http://localhost:3000/${res.data.imagePath}`,
                };
                const response = client.mutation({
                  updateCollection: [
                    { updateCollectionInput: updateObject },
                    { _id: true },
                  ],
                }).finally(() => {
                  store.dispatch(handleGetCollections({}));
                store.dispatch(setImage(null));
                store.dispatch(setCollectionImage(""));
                store.dispatch(setSuccessSaving(true));
                store.dispatch(setCollectionError(""));
                });

                console.log(response);
                console.log("res", res);
              })
          }
        } catch (error) {
          console.log("error al guardar", error);
        }
      } else {
        store.dispatch(setCollectionError("All fields are required"));
        store.dispatch(setSuccessSaving(false));
      }

      break;

    default:
      break;
  }
  return next(action);
};

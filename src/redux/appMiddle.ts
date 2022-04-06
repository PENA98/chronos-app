import { client } from "../graphql/client";
import {
  createCollectionInput,
  createCollectionItemInput,
} from "../graphql/generated";
import axios from "axios";
import {
  handleGetCollections,
  setCollections,
  setImage,
  setCollectionError,
  setCollectionImage,
  setSuccessSaving,
  setCollectionItemError,
  handleGetCollectionItems,
  setCollectionItemImage,
  setCollectionItems,
  setCollection,
  setLoading,
  setDisableButton,
} from "./appSlice";

export const appMiddle = (store: any) => (next: any) => async (action: any) => {
  const { appReducer, authReducer } = store.getState();
  switch (action.type) {
    case "app/handleNewCollection":
      console.log("Desde el middle", action.payload);
      store.dispatch(setDisableButton(true));

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
          const url = `${process.env.REACT_APP_API_URI}/uploadImage`;

          axios
            .post(url, file)
            .then((res) => {
              const createCollectionInput: createCollectionInput = {
                name: action.payload.name,
                description: action.payload.description,
                image: `${process.env.REACT_APP_API_URI}/${res.data.imagePath}`,
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
              store.dispatch(setDisableButton(false));
            });
        } catch (error) {
          console.error("error al guardar", error);
        }
      } else {
        store.dispatch(setCollectionError("All fields are required"));
        store.dispatch(setSuccessSaving(false));
        store.dispatch(setDisableButton(false));
      }

      break;

    case "app/handleGetCollections":
      try {
        store.dispatch(setLoading(true));
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
        store.dispatch(setLoading(false));
      } catch (error) {
        console.error("error al guardar", error);
      }

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
      store.dispatch(setDisableButton(true));

      if (
        action.payload.name !== "" &&
        action.payload.name !== undefined &&
        action.payload.description !== "" &&
        action.payload.description !== undefined
      ) {
        try {
          console.log("Desde el middle", store.getState());

          if (appReducer.image === null) {
            const updateObject = action.payload;
            const response = await client
              .mutation({
                updateCollection: [
                  { updateCollectionInput: updateObject },
                  { _id: true },
                ],
              })
              .finally(() => {
                store.dispatch(handleGetCollections({}));
                store.dispatch(setImage(null));
                store.dispatch(setCollectionImage(""));
                store.dispatch(setSuccessSaving(true));
                store.dispatch(setCollectionError(""));
                store.dispatch(setDisableButton(false));
              });
            console.log("response", response);
          } else {
            const file = new FormData();
            file.append("file", appReducer.image);
            console.warn("File", appReducer.image);
            const url = `${process.env.REACT_APP_API_URI}/uploadImage`;
            console.log("url", appReducer.image);
            axios.post(url, file).then((res) => {
              const updateObject = {
                ...action.payload,
                image: `${process.env.REACT_APP_API_URI}/${res.data.imagePath}`,
              };
              const response = client
                .mutation({
                  updateCollection: [
                    { updateCollectionInput: updateObject },
                    { _id: true },
                  ],
                })
                .finally(() => {
                  store.dispatch(handleGetCollections({}));
                  store.dispatch(setImage(null));
                  store.dispatch(setCollectionImage(""));
                  store.dispatch(setSuccessSaving(true));
                  store.dispatch(setCollectionError(""));
                  store.dispatch(setDisableButton(false));
                });

              console.log(response);
              console.log("res", res);
            });
          }
        } catch (error) {
          console.log("error al guardar", error);
        }
      } else {
        store.dispatch(setCollectionError("All fields are required"));
        store.dispatch(setSuccessSaving(false));
        store.dispatch(setDisableButton(false));
      }

      break;

    //Collection Items

    case "app/handleNewCollectionItem":
      console.log("Desde el middle", action.payload);
      store.dispatch(setDisableButton(true));

      if (
        action.payload.name !== "" &&
        action.payload.name !== undefined &&
        action.payload.description !== "" &&
        action.payload.description !== undefined &&
        action.payload.price !== "" &&
        action.payload.price !== undefined &&
        action.payload.condition !== "" &&
        action.payload.condition !== undefined &&
        action.payload.collectionID !== "" &&
        action.payload.collectionID !== undefined &&
        appReducer.image !== null
      ) {
        try {
          console.log("Desde el middle", store.getState());
          const { appReducer, authReducer } = store.getState();
          const file = new FormData();
          file.append("file", appReducer.image);
          console.warn("File", appReducer.image);
          const url = `${process.env.REACT_APP_API_URI}/uploadImage`;

          axios
            .post(url, file)
            .then((res) => {
              const collectionItem: createCollectionItemInput = {
                name: action.payload.name,
                description: action.payload.description,
                price: action.payload.price,
                condition: action.payload.condition,
                collectionID: action.payload.collectionID,
                image: `${process.env.REACT_APP_API_URI}/${res.data.imagePath}`,
                createdAt: new Date(),
                updatedAt: new Date(),
              };

              const response = client
                .mutation({
                  createCollectionItem: [
                    { createCollectionItemInput: collectionItem },
                    { _id: true },
                  ],
                })
                .then(() => {
                  store.dispatch(
                    handleGetCollectionItems({
                      collectionID: action.payload.collectionID,
                    })
                  );
                  store.dispatch(setImage(null));
                  store.dispatch(setCollectionItemImage(""));
                  store.dispatch(setSuccessSaving(true));
                  store.dispatch(setCollectionItemError(""));
                  store.dispatch(setDisableButton(false));
                });

              console.log(response);
              console.log("res", res);
            })
            .then(() => {
              store.dispatch(
                handleGetCollectionItems({
                  collectionID: action.payload.collectionID,
                })
              );
              store.dispatch(setImage(null));
              store.dispatch(setCollectionItemImage(""));
              store.dispatch(setSuccessSaving(true));
              store.dispatch(setCollectionItemError(""));
              store.dispatch(setDisableButton(false));
            });
        } catch (error) {
          console.error("error al guardar", error);
        }
      } else {
        store.dispatch(setCollectionItemError("All fields are required"));
        store.dispatch(setSuccessSaving(false));
        store.dispatch(setDisableButton(false));
      }

      break;

    case "app/handleGetCollectionItems":
      store.dispatch(setLoading(true));
      try {
        console.log(action.payload);
        const response = await client.query({
          collectionItems: [
            { collectionID: action.payload.collectionID.toString() },
            {
              _id: true,
              name: true,
              description: true,
              price: true,
              condition: true,
              image: true,
              collectionID: true,
              createdAt: true,
              updatedAt: true,
            },
          ],
        });
        console.log(response.collectionItems);
        store.dispatch(setCollectionItems(response.collectionItems));
        store.dispatch(setLoading(false));
      } catch (error) {
        console.log("error", error);
      }
      break;

    case "app/handleEditCollectionItem":
      console.log("Desde el middle", action.payload);
      console.log("nosta", appReducer.image);
      store.dispatch(setDisableButton(true));

      if (
        action.payload.name !== "" &&
        action.payload.name !== undefined &&
        action.payload.description !== "" &&
        action.payload.description !== undefined &&
        action.payload.price !== "" &&
        action.payload.price !== undefined &&
        action.payload.condition !== "" &&
        action.payload.condition !== undefined
      ) {
        try {
          console.log("Desde el middle", store.getState());

          if (appReducer.image === null) {
            const updateObject = action.payload;
            const response = await client
              .mutation({
                updateCollectionItem: [
                  { collectionItem: updateObject },
                  { _id: true },
                ],
              })
              .finally(() => {
                store.dispatch(
                  handleGetCollectionItems({
                    collectionID: action.payload.collectionID,
                  })
                );
                store.dispatch(setImage(null));
                store.dispatch(setCollectionImage(""));
                store.dispatch(setSuccessSaving(true));
                store.dispatch(setCollectionError(""));
                store.dispatch(setDisableButton(false));
              });
            console.log("response", response);
          } else {
            const file = new FormData();
            file.append("file", appReducer.image);
            console.warn("File", appReducer.image);
            const url = `${process.env.REACT_APP_API_URI}/uploadImage`;
            console.log("url", appReducer.image);

            axios.post(url, file).then((res) => {
              const updateObject = {
                ...action.payload,
                image: `${process.env.REACT_APP_API_URI}/${res.data.imagePath}`,
              };
              const response = client
                .mutation({
                  updateCollectionItem: [
                    { collectionItem: updateObject },
                    { _id: true },
                  ],
                })
                .finally(() => {
                  store.dispatch(
                    handleGetCollectionItems({
                      collectionID: action.payload.collectionID,
                    })
                  );
                  store.dispatch(setImage(null));
                  store.dispatch(setCollectionItemImage(""));
                  store.dispatch(setSuccessSaving(true));
                  store.dispatch(setCollectionItemError(""));
                  store.dispatch(setDisableButton(false));
                });

              console.log(response);
              console.log("res", res);
            });
          }
        } catch (error) {
          console.log("error al guardar", error);
        }
      } else {
        store.dispatch(setCollectionError("All fields are required"));
        store.dispatch(setSuccessSaving(false));
        store.dispatch(setDisableButton(false));
      }

      break;
    case "app/handleGetCollection":
      store.dispatch(setLoading(true));
      try {
        console.log(action.payload);
        const response = await client.query({
          collection: [
            { collectionID: action.payload.collectionID },
            {
              name: true,
            },
          ],
        });
        console.log(response.collection);
        store.dispatch(setCollection(response.collection));
        store.dispatch(setLoading(false));
      } catch (error) {
        console.log("error", error);
      }
      break;

    case "app/handleDeleteCollectionItem":
      try {
        console.log(action.payload);
        const response = await client
          .mutation({
            deleteCollectionItem: [{ id: action.payload.id }, { _id: true }],
          })
          .finally(() => {
            store.dispatch(
              handleGetCollectionItems({
                collectionID: action.payload.collectionID,
              })
            );
          });
        console.log(response);
      } catch (error) {
        console.log("error", error);
      }
      break;

    default:
      break;
  }
  return next(action);
};

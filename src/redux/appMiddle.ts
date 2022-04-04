import { client } from "../graphql/client";
import { createCollectionInput } from "../graphql/generated";
import axios from "axios";
import { handleGetCollections, setCollections } from "./appSlice";

export const appMiddle = (store: any) => (next: any) => async (action: any) => {
  switch (action.type) {
    case "app/handleNewCollection":
      console.log(action.payload);

      console.log("Desde el middle", action.payload);

      try {
        console.log("Desde el middle", store.getState());
        const { appReducer, authReducer } = store.getState();
        const file = new FormData();
        file.append("file", appReducer.image);
        console.warn("File", appReducer.image);
        const url = "http://localhost:3000/uploadImage";

        axios.post(url, file).then((res) => {
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
        }).then(() => { 
          store.dispatch(handleGetCollections({}));
        });
      } catch (error) {
        console.error("error al guardar", error);
      }
      break;

      case "app/handleGetCollections":
        const { authReducer } = store.getState();
        const userID = authReducer.isAuthed.user._id;
        const response = await client.query({ 
          getUserCollections: [{userID}, {  _id:true ,name: true, description: true, image: true, userID: true, createdAt: true, updatedAt: true }]
        });
        console.log(response.getUserCollections);
        store.dispatch(setCollections(response.getUserCollections));
        break;

    default:
      break;
  }
  return next(action);
};

import Collection from "../components/Collection";
import { useEffect, useState } from "react";
import { Message, getMessages } from "../data/messages";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonModal,
  useIonViewWillEnter,
} from "@ionic/react";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { styled } from "@mui/material/styles";
import "./Home.css";
import { add } from "ionicons/icons";
import { Box, Button, Grid, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  handleNewCollection,
  setImage,
  handleGetCollections,
} from "../redux/appSlice";
import { RootState } from "../redux/store";
import { Collection as CollectionType } from "../graphql/generated";

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [Name, setName] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const { appReducer } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const handleDismiss = () => {
    dismiss();
  };

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const [present, dismiss] = useIonModal(Modal, {
    onDismiss: handleDismiss,
    name: Name,
    setName: setName,
    description: Description,
    setDescription: setDescription,
  });

  useEffect(() => {
    dispatch(handleGetCollections({}));
    console.log(appReducer);
  }, []);

  return (
    <IonPage id="home-page">
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton
          onClick={() =>
            present({
              initialBreakpoint: 0.75,
              breakpoints: [0.1, 0.75, 1],
              swipeToClose: true,
            })
          }
        >
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Chronos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Grid>
          <IonRefresher slot="fixed" onIonRefresh={refresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>

          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Chronos</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            {appReducer?.collections.map((collection: CollectionType) => (
              <Collection key={collection._id} prop={collection} />
            ))}
          </IonList>
        </Grid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

interface iModal {
  onDismiss: () => void;
  name: string;
  setName: (name: string | null | undefined) => void;
  description: string;
  setDescription: (description: string | null | undefined) => void;
}

const Input = styled("input")({
  display: "none",
});

const Modal: React.FC<iModal> = ({
  onDismiss,
  name,
  setName,
  description,
  setDescription,
}) => {
  // const { loading } = useSelector((state: RootState) => state.appReducer)
  const dispatch = useDispatch();

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onDismiss()}>Close</IonButton>
          </IonButtons>
          <IonTitle>Add collection</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                dispatch(handleNewCollection({ name, description }));
                onDismiss();
              }}
            >
              Create
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              placeholder="Collection name"
              value={name}
              onIonChange={(e) => setName(e.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput
              autocomplete="off"
              placeholder="Collection description"
              value={description}
              onIonChange={(e) => setDescription(e.detail.value)}
            />
          </IonItem>
          <Stack direction="row" alignItems="center" spacing={2} marginLeft={2}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                onChange={(e: any) => dispatch(setImage(e.target.files[0]))}
                type="file"
              />
              <Button
                sx={{ mt: 2, mr: 1 }}
                variant="contained"
                component="span"
                endIcon={<PhotoCameraBackIcon />}
              >
                Upload image of the collection
              </Button>
            </label>
          </Stack>
        </IonList>
      </IonContent>
    </>
  );
};

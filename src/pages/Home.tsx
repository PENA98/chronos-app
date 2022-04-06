import Collection from "../components/Collection";
import { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { styled } from "@mui/material/styles";
import "./Home.css";
import { add, logOutOutline } from "ionicons/icons";
import { Alert, Box, Button, Grid, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  handleNewCollection,
  setImage,
  handleGetCollections,
  setCollectionImage,
  setSuccessSaving,
  handleCollectionEdit,
} from "../redux/appSlice";
import { RootState } from "../redux/store";
import { Collection as CollectionType } from "../graphql/generated";

const Home: React.FC = () => {
  const [Name, setName] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const { appReducer } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleDismiss = () => {
    setName("");
    setDescription("");
    dispatch(setSuccessSaving(false));
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
  }, [dispatch]);

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
          <IonIcon
            slot="end"
            style={{ margin: 10, height: 30, width: 30, cursor: "pointer" }}
            icon={logOutOutline}
            onClick={() => {
              localStorage.removeItem("authed");
              window.location.replace("#");
            }}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {appReducer.collections.length === 0 &&
        appReducer?.loading === false ? (
          <IonText color="primary">
            <h1>It appears that you have no collections, try adding one!</h1>
          </IonText>
        ) : null}
        <IonProgressBar type="indeterminate" hidden={!appReducer?.loading} />
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
              <Collection
                key={collection._id}
                prop={collection}
                modal={EditModal}
              />
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
  const { appReducer } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (appReducer.successSaving) {
      onDismiss();
    }
  }, [appReducer.successSaving, onDismiss]);

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
              disabled={appReducer.disableButton}
              onClick={() => {
                dispatch(handleNewCollection({ name, description }));
              }}
            >
              Create
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Grid container spacing={2}>
          {appReducer?.collectionError !== "" ? (
            <Grid item marginTop={1} xs={12} sm={12}>
              <Alert variant="outlined" severity="error">
                {appReducer?.collectionError}
              </Alert>
            </Grid>
          ) : null}
        </Grid>
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
                onChange={(e: any) => {
                  dispatch(setImage(e.target.files[0]));
                  dispatch(
                    setCollectionImage(URL.createObjectURL(e.target.files[0]))
                  );
                }}
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

              {appReducer?.collectionImage ? (
                <div className="container-custom">
                  <div className="center-custom">
                    <Box sx={{ mt: 1, width: "200px", height: "200px" }}>
                      <IonImg
                        src={appReducer?.collectionImage}
                        alt="Imagen subida"
                      ></IonImg>
                    </Box>
                  </div>
                </div>
              ) : null}
            </label>
          </Stack>
        </IonList>
      </IonContent>
    </>
  );
};

interface iEditModal {
  onDismiss: () => void;
  collection: CollectionType;
}

const EditModal: React.FC<iEditModal> = ({ onDismiss, collection }) => {
  const { appReducer } = useSelector((state: RootState) => state);
  const [EditName, setEditName] = useState<string>(collection.name);
  const [EditDescription, setEditDescription] = useState<string>(
    collection.description
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (appReducer.successSaving) {
      onDismiss();
    }
  }, [appReducer.successSaving, onDismiss]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onDismiss()}>Close</IonButton>
          </IonButtons>
          <IonTitle>Edit collection</IonTitle>
          <IonButtons slot="end">
            <IonButton
              disabled={appReducer.disableButton}
              onClick={() => {
                dispatch(
                  handleCollectionEdit({
                    ...collection,
                    name: EditName,
                    description: EditDescription,
                    updatedAt: new Date(),
                  })
                );
              }}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Grid container spacing={2}>
          {appReducer?.collectionError !== "" ? (
            <Grid item marginTop={1} xs={12} sm={12}>
              <Alert variant="outlined" severity="error">
                {appReducer?.collectionError}
              </Alert>
            </Grid>
          ) : null}
        </Grid>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              placeholder="Collection name"
              value={EditName}
              onIonChange={(e) => setEditName(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput
              autocomplete="off"
              placeholder="Collection description"
              value={EditDescription}
              onIonChange={(e) => setEditDescription(e.detail.value!)}
            />
          </IonItem>
          <Stack direction="row" alignItems="center" spacing={2} marginLeft={2}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                onChange={(e: any) => {
                  dispatch(setImage(e.target.files[0]));
                  dispatch(
                    setCollectionImage(URL.createObjectURL(e.target.files[0]))
                  );
                }}
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

              {appReducer?.collectionImage || collection?.image ? (
                <div className="container-custom">
                  <div className="center-custom">
                    <Box sx={{ mt: 1, width: "200px", height: "200px" }}>
                      <IonImg
                        src={appReducer?.collectionImage || collection?.image}
                        alt="Imagen subida"
                      ></IonImg>
                    </Box>
                  </div>
                </div>
              ) : null}
            </label>
          </Stack>
        </IonList>
      </IonContent>
    </>
  );
};

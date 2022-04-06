import { useEffect, useState } from "react";
import {
  IonBackButton,
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
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { add } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./CollectionItems.css";
import { RootState } from "../redux/store";
import {
  handleGetCollectionItems,
  handleNewCollectionItem,
  setCollectionItemImage,
  setImage,
  setSuccessSaving,
  handleEditCollectionItem,
  handleGetCollection,
} from "../redux/appSlice";
import { updateCollectionItemInput } from "../graphql/generated";
import { Alert, Box, Button, Grid, Stack, styled } from "@mui/material";
import CollectionItem from "../components/collectionItem";

const CollectionItems: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const params = useParams<{ _id: string }>();
  const dispatch = useDispatch();
  const { appReducer } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(handleGetCollectionItems({ collectionID: params._id }));
    dispatch(handleGetCollection({ collectionID: params._id }));
  }, [dispatch, params._id]);

  const handleDismiss = () => {
    dispatch(setSuccessSaving(false));
    dismiss();
  };

  const [present, dismiss] = useIonModal(Modal, {
    onDismiss: handleDismiss,
    collectionID: params._id,
  });

  return (
    <IonPage id="view-message-page">
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
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={appReducer?.collection?.name}
              defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
          <IonSearchbar
            slot="end"
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {appReducer.collectionItems.length === 0 &&
        appReducer?.loading === false ? (
          <IonText color="primary">
            <h1>It appears that you have no items, try adding one!</h1>
          </IonText>
        ) : null}
        <IonProgressBar type="indeterminate" hidden={!appReducer?.loading} />
        {appReducer ? (
          <>
            <Grid container spacing={2}>
              {appReducer.collectionItems
                .filter((item: any) =>
                  item.name.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((item: any) => (
                  <CollectionItem
                    key={item._id}
                    item={item}
                    modal={EditModal}
                  />
                ))}
            </Grid>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CollectionItems;

interface iModal {
  onDismiss: () => void;
  collectionID: string | undefined | null;
}

const Input = styled("input")({
  display: "none",
});

const Modal: React.FC<iModal> = ({ onDismiss, collectionID }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("new");
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
          <IonTitle>Add collection item</IonTitle>
          <IonButtons slot="end">
            <IonButton
              disabled={appReducer.disableButton}
              onClick={() => {
                dispatch(
                  handleNewCollectionItem({
                    name,
                    description,
                    price,
                    condition,
                    collectionID,
                  })
                );
              }}
            >
              Create
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Grid container spacing={2}>
          {appReducer?.collectionItemError !== "" ? (
            <Grid item marginTop={1} xs={12} sm={12}>
              <Alert variant="outlined" severity="error">
                {appReducer?.collectionItemError}
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
              onIonChange={(e) => setName(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput
              autocomplete="off"
              placeholder="Collection description"
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Price</IonLabel>
            <IonInput
              placeholder="0.00"
              type="number"
              defaultValue="0"
              value={price}
              onIonChange={(e) => setPrice(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Condition</IonLabel>
            <IonSelect
              value={condition}
              okText="Okay"
              onIonChange={(e) => setCondition(e.detail.value!)}
            >
              <IonSelectOption value="new">New</IonSelectOption>
              <IonSelectOption value="used">Used</IonSelectOption>
            </IonSelect>
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
                    setCollectionItemImage(
                      URL.createObjectURL(e.target.files[0])
                    )
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

              {appReducer?.collectionItemImage ? (
                <div className="container-custom">
                  <div className="center-custom">
                    <Box sx={{ mt: 1, width: "200px", height: "200px" }}>
                      <IonImg
                        src={appReducer?.collectionItemImage}
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
  collectionItem: updateCollectionItemInput;
}

const EditModal: React.FC<iEditModal> = ({ onDismiss, collectionItem }) => {
  const { appReducer } = useSelector((state: RootState) => state);
  const [EditName, setEditName] = useState<string>(collectionItem.name);
  const [EditDescription, setEditDescription] = useState<string>(
    collectionItem.description
  );
  const [EditPrice, setEditPrice] = useState<string>(collectionItem.price);
  const [EditCondition, setEditCondition] = useState<string>(
    collectionItem.condition
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
                  handleEditCollectionItem({
                    ...collectionItem,
                    name: EditName,
                    description: EditDescription,
                    price: EditPrice,
                    condition: EditCondition,
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
          <IonItem>
            <IonLabel position="floating">Price</IonLabel>
            <IonInput
              placeholder="0.00"
              type="number"
              defaultValue="0"
              value={EditPrice}
              onIonChange={(e) => setEditPrice(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Condition</IonLabel>
            <IonSelect
              value={EditCondition}
              okText="Okay"
              onIonChange={(e) => setEditCondition(e.detail.value!)}
            >
              <IonSelectOption value="new">New</IonSelectOption>
              <IonSelectOption value="used">Used</IonSelectOption>
            </IonSelect>
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
                    setCollectionItemImage(
                      URL.createObjectURL(e.target.files[0])
                    )
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

              {appReducer?.collectionItemImage || collectionItem?.image ? (
                <div className="container-custom">
                  <div className="center-custom">
                    <Box sx={{ mt: 1, width: "200px", height: "200px" }}>
                      <IonImg
                        src={
                          appReducer?.collectionItemImage ||
                          collectionItem?.image
                        }
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

import {
  IonBadge,
  IonIcon,
  IonItem,
  useIonModal,
  IonLabel,
  IonImg,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonToolbar,
  IonButtons,
  IonButton,
  IonList,
  IonListHeader,
  useIonPopover,
} from "@ionic/react";
import { Grid } from "@mui/material";
import {
  ellipsisHorizontalOutline,
} from "ionicons/icons";
import "./Collection.css";
import { useDispatch } from "react-redux";
import {
  handleDeleteCollectionItem,
  setSuccessSaving,
} from "../redux/appSlice";

const PopoverList: React.FC<any> = ({ onHide, present, id, collectionID }) => {
  const dispatch = useDispatch();
  return (
    <IonList>
      <IonListHeader>Options</IonListHeader>
      <IonItem
        button
        onClick={() => {
          onHide();
          present({
            initialBreakpoint: 0.25,
            breakpoints: [0.1, 0.75, 1],
            swipeToClose: true,
          });
        }}
      >
        Edit
      </IonItem>
      <IonItem
        lines="none"
        detail={false}
        button
        onClick={() => {
          dispatch(
            handleDeleteCollectionItem({ id: id, collectionID: collectionID })
          );
          onHide();
        }}
      >
        Delete
      </IonItem>
      <IonItem lines="none" detail={false} button onClick={onHide}>
        close
      </IonItem>
    </IonList>
  );
};

const Collection: React.FC<any> = ({ item, modal }) => {
  const [presentPopover, dismissPopover] = useIonPopover(PopoverList, {
    onHide: () => dismissPopover(),
    present: () => present(),
    id: item?._id,
    collectionID: item?.collectionID,
  });
  const dispatch = useDispatch();

  const handleDismiss = () => {
    dispatch(setSuccessSaving(false))
    dismiss();
  };

  const [present, dismiss] = useIonModal(modal, {
    onDismiss: handleDismiss,
    collectionItem: item,
  });

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
      <IonCard>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              expand="block"
              onClick={(e) =>
                presentPopover({
                  event: e.nativeEvent,
                })
              }
            >
              <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontalOutline}
                md={ellipsisHorizontalOutline}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <img src={item.image} aspect-ratio="900/600" alt={item.name} />

        <IonCardHeader>
          <IonCardTitle>{item.name}</IonCardTitle>
          <IonCardSubtitle>
            {`Created at ${new Date(item.createdAt).toLocaleString()}`}
          </IonCardSubtitle>
          <IonCardSubtitle>
            {`Updated at ${new Date(item.updatedAt).toLocaleString()}`}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>{item.description}</IonCardContent>

        <IonItem lines="none">
          <IonBadge
            color={item.condition === "new" ? "success" : "warning"}
            style={{ margin: 5 }}
          >
            {item.condition}
          </IonBadge>
          <IonLabel slot="end">
            <h1>{item.price}</h1>
          </IonLabel>
          <IonImg
            slot="end"
            src="/dollar.png"
            style={{ height: 24, width: 24, margin: 5 }}
          ></IonImg>
        </IonItem>
      </IonCard>
    </Grid>
  );
};

export default Collection;

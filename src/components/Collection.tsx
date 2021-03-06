import {
  IonBadge,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  useIonModal,
  IonLabel,
} from "@ionic/react";
import { Grid } from "@mui/material";
import { archive, createOutline } from "ionicons/icons";
import "./Collection.css";
import { deleteCollectionHandler, setSuccessSaving } from "../redux/appSlice";
import { useDispatch } from "react-redux";

const Collection: React.FC<any> = ({ prop, modal }) => {
  const dispatch = useDispatch();

  
  const handleDismiss = () => {
    dispatch(setSuccessSaving(false));
    dismiss();
  };

  const [present, dismiss] = useIonModal(modal, {
    onDismiss: handleDismiss,
    collection: prop
  });


  return (
    <Grid item marginTop={1} xs={11} sm={11}>
      <IonItemSliding>
        <IonItemOptions side="start">
          <IonItemOption
            expandable
            color="secondary"
            onClick={() =>  present({
              initialBreakpoint: 0.75,
              breakpoints: [0.1, 0.75, 1],
              swipeToClose: true,
            })}
          >
             <IonIcon slot="start" icon={createOutline} />
            Edit
          </IonItemOption>
        </IonItemOptions>
        <IonItem routerLink={`/collection/${prop?._id}`} detail={false}>
          <img src={prop?.image} alt={prop?.name} />
          <IonLabel className="ion-text-wrap">
            <h2>{prop?.name}</h2>
            <p>{prop?.description}</p>
          </IonLabel>

          <IonBadge mode="ios" color="primary" slot="end">
            10
          </IonBadge>
        </IonItem>

        <IonItemOptions>
          <IonItemOption expandable color="danger" onClick={() => dispatch(deleteCollectionHandler(prop?._id)) }>
            <IonIcon slot="end" icon={archive} />
            Delete
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </Grid>
  );
};

export default Collection;

import {
  IonBadge,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonNote,
} from "@ionic/react";
import { Grid } from "@mui/material";
import { archive, createOutline, ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";
import { useEffect } from "react";
import "./Collection.css";

const Collection: React.FC<any> = (prop) => {
  useEffect(() => {
    console.log(prop);
  }, [prop]);
  return (
    <Grid item marginTop={1} xs={11} sm={11}>
      <IonItemSliding>
        <IonItemOptions side="start">
          <IonItemOption
            expandable
            color="secondary"
            onClick={() => console.log("favorite clicked")}
          >
             <IonIcon slot="start" icon={createOutline} />
            Edit
          </IonItemOption>
        </IonItemOptions>
        <IonItem routerLink={`/message/${prop?.prop?._id}`} detail={false}>
          <img src={prop?.prop?.image} />
          <IonLabel className="ion-text-wrap">
            <h2>{prop?.prop?.name}</h2>
            <p>{prop?.prop?.description}</p>
          </IonLabel>

          <IonBadge mode="ios" color="primary" slot="end">
            10
          </IonBadge>
        </IonItem>

        <IonItemOptions>
          <IonItemOption expandable color="danger">
            <IonIcon slot="end" icon={archive} />
            Delete
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </Grid>
  );
};

export default Collection;

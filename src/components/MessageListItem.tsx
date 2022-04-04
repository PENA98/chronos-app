import { IonBadge, IonItem, IonLabel, IonNote } from "@ionic/react";
import { Grid } from "@mui/material";
import { Message } from "../data/messages";
import "./MessageListItem.css";

interface MessageListItemProps {
  message: Message;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  return (
    <Grid item marginTop={1} xs={11} sm={11} >
      <IonItem routerLink={`/message/${message.id}`} detail={false}>
      <img src="https://picsum.photos/200/300" />
        <IonLabel className="ion-text-wrap">
          <h2>{message.fromName}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </IonLabel>

        <IonBadge mode="ios" slot="end">
          10
        </IonBadge>
      </IonItem>
    </Grid>
  );
};

export default MessageListItem;

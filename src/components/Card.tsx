import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonFooter,
} from "@ionic/react";
import "./Card.css";

export const Card = (props: any) => {
  return (
    <>
      <IonCard  style={{ textAlign: "center", margin:"16px" }}>
        <IonCardHeader>
          <IonCardTitle>{props.data.title}</IonCardTitle>
          <IonCardSubtitle>
            <p>Language: {props.data.original_language}</p>
            <p>Release Date: {props.data.release_date}</p>
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>

          <img
            src={`https://image.tmdb.org/t/p/w500/${props.data.backdrop_path}`}
            alt="image missing"
          />
        </IonCardContent>
        <div style={{padding:"8px"}}>
          <h3>{props.data.overview}</h3>
        </div>
        <IonFooter>
          {props.isAdd ? (
            <IonButton fill="clear" onClick={props.onClick}>
              Add to favorite
            </IonButton>
          ) : null}
        </IonFooter>
      </IonCard>
    </>
  );
};

export default Card;

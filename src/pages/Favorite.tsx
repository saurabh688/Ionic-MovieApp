import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const Favorite: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState<any[]>([]);

  useEffect(() => {
    let data: any = new Set();
    if (movies.length > 0) {
      movies.forEach((item: any) => {
        var config = {
          method: "get",
          url: `https://api.themoviedb.org/3/movie/${item.movieName}?api_key=1f44ec2dd416fe9d5213732250697685&language=en-US                    `,
          headers: {},
        };

        axios(config)
          .then(function (response) {
            data.add(response.data);
            setMovieData([...data]);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  }, [movies]);

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://52.22.67.184:4000/movies/getMovies",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setMovies(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle style={{textAlign:"center"}}>
            <IonButton style={{color:"#fff"}} fill="clear" routerLink={"/"}>
              Moviemania
            </IonButton>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="dark" fullscreen>
        {movieData.map((item: any) => (
          <Card data={item} isAdd={false} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Favorite;

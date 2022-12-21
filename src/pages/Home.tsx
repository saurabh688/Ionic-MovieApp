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

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState([]);
  const getMovie = async () => {
    let uri = `https://api.themoviedb.org/3/search/movie?api_key=1f44ec2dd416fe9d5213732250697685&language=en-US&query=${search}&page=1&include_adult=false`;
    try {
      const res = await axios.get(uri);
      setSearchData(res.data.results);
    } catch (e) {
      setSearchData([]);
    }
  };

  const getMovies = async () => {
    let uri = `https://api.themoviedb.org/3/movie/top_rated?api_key=1f44ec2dd416fe9d5213732250697685`;
    try {
      const res = await axios.get(uri);
      setSearchData(res.data.results);
    } catch (e) {
      setSearchData([]);
    }
  };
  const saveData = (item: any) => {
    console.log("fdasfawerqwerfdsf", item);
    var data = JSON.stringify({
      movieName: item.id,
    });

    var config = {
      method: "post",
      url: "http://52.22.67.184:4000/movies/saveMovie",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle style={{textAlign:"center", marginTop:"4px"}}>Moviemania</IonTitle>
          <IonButton fill="clear" routerLink={"/Favorite"}>
            Saved Movies
          </IonButton>
          <IonSearchbar
          style={{marginBottom:"16px"}}
          animated={true}
          value={search}
          placeholder="Search any movie"
          onInput={(e: any) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              if (search === "") {
                getMovies();
              } else {
                getMovie();
              }
            }
          }}
        ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent color="dark" fullscreen>
     
        {searchData.map((item: any) => (
          <Card data={item} isAdd={true} onClick={() => saveData(item)} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;

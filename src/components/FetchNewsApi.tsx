import { useEffect, useState } from "react";

//interfaces für Data
interface INewsData {
  status: string;
  totalResults: number;
  articles: IArticle[];
}
interface IArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}


//interface Props aus Home.tsx
interface IProps {
    searchInput: string;
    selectLanguage: string;
    selectFilter: string
}

//verschlüsselter API Key
const apiKey = import.meta.env.VITE_NEWS_KEY;


//props aus oberster Datei(Home) werden hier als Paramter übergeben
//Props sind die useStates zu den search-Feldern
//hier in der Datei muss dazu ein passendes Interface erstellt werden (s.o.)
//hier brauche ich dann den Wert, den Getter, des useStatus()
const FetchNewsApi: React.FC<IProps> = (props) => {
    //useState für den fetch
    //Typ ist erstmal der komplette fetch
  const [newsData, setNewsData] = useState<null | INewsData>(null);


  //fetch ist ausgelagert, damit ich die Parameter (search Parameter) mit übergeben kann
  const fetchData = (
    searchTerm: string,
    sortBy: string,
    language: string,
    apiKey: string
  ) => {
    //fetch Block--> immer so?!
    //danach hab ich dann die kompletten Dateien, in dem Fall also noch nicht das Array aus Artikeln
    fetch(
      `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=${sortBy}&language=${language}&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((error) => console.log(error));
  };

  //im useEffect() wird die fetch Funktion aufgerufen
  //aber nur dann, wenn alle search Felder ausgefüllt wurden
  //wenn nichts ausgefüllt ist, habe ich default Werte angegeben (else)
  //funktioniert aber auch ohne die default Werte
  //die Abhängigkeiten sind die search Felder
  //ohne die Abhängigkeit passiert gar nichts-bzw eben nur der erste fetch aus dem else Teil
  //useEffect wird erst dann wieder benutzt, wenn sich ein State ändert
  useEffect(() => {
    if (props.searchInput && props.selectFilter && props.selectLanguage) {
        fetchData(props.searchInput, props.selectFilter, props.selectLanguage, apiKey);
    } else {
        fetchData("fuck the patriarchy", "relevancy", "en", apiKey)
    }
  }, [props.searchInput, props.selectFilter, props.selectLanguage]);


  //hier ist wichtig, dass erstmal mit ternary operator abgefragt wird, ob newsData(gefetchte Dateien) existieren
  //Und dann muss .articles gemapped werden und für den Parameter der passende Typ mitgegeben werden
  return (
    <>
      {newsData ? (
        newsData.articles.map((article: IArticle) => (
          <div key={article.title} className="border p-3 flex flex-col">
            <h2 className="font-bold mb-5">{article.title}</h2>
            <h4 className="mb-5">{article.author}</h4>
            <p className="text-sm mb-2">{article.description}</p>
            <figure className="mb-2">
              <img src={article.urlToImage} alt="" />
            </figure>
            <a className="text-center mt-auto" href={article.url}>Link to Full Article</a>
          </div>
        ))
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default FetchNewsApi;

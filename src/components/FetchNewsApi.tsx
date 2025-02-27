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


//interface Props
interface IProps {
    searchInput: string;
    selectLanguage: string;
    selectFilter: string
}

//verschlüsselter API Key
const apiKey = import.meta.env.VITE_NEWS_KEY;



const FetchNewsApi: React.FC<IProps> = (props) => {
  const [newsData, setNewsData] = useState<null | INewsData>(null);

  const fetchData = (
    searchTerm: string,
    sortBy: string,
    language: string,
    apiKey: string
  ) => {
    fetch(
      `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=${sortBy}&language=${language}&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((error) => console.log(error));
  };

console.log("Props");

  useEffect(() => {
    if (props.searchInput && props.selectFilter && props.selectLanguage) {
        fetchData(props.searchInput, props.selectFilter, props.selectLanguage, apiKey);
    } else {
        fetchData("cat", "relevancy", "en", apiKey)
    }
  }, [props.searchInput, props.selectFilter, props.selectLanguage]);

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

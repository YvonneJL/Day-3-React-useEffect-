import { useState } from "react";
import FetchNewsApi from "../components/FetchNewsApi";
import Header from "../components/Header";


//oberste Datei, hier kommen quasi alle Komponenten zusammen
//deshalb werden hier die "Props" definiert--> die 3 States unten, werden hier initialisert und dann in die Komponenten weiter gegeben
const Home = () => {
    
    const [searchInput, setSearchInput] = useState("")
    const [selectLanguage, setSelectLanguage] = useState("")
    const [selectFilter, setSelectFilter] = useState("")

    return ( 
        <>
        <Header searchInput={searchInput} setSearchInput={setSearchInput} setSelectFilter={setSelectFilter} setSelectLanguage={setSelectLanguage}/>
        <section className="grid grid-cols-4 gap-10">
        <FetchNewsApi searchInput={searchInput} selectFilter={selectFilter} selectLanguage={selectLanguage} />
        </section>
        </>
     );
}
 
export default Home;
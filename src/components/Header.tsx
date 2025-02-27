//Interface für die Probs aus der Home.tsx
export interface IProps {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    setSelectLanguage: React.Dispatch<React.SetStateAction<string>>;
    setSelectFilter: React.Dispatch<React.SetStateAction<string>>;
}


//Props als Parameter weiter geben und den Typ der Funktion entsprechend bestimmen
//um auf die Inputfelder zugreifen zu können und sie dann im Fetch-Link zu bneutzen benutze ich hier onChange und ändere die useStatus() zum Value des Input-Feldes
//hier brauche ich also nur die Veränderungsfunktion aus dem useStatus()
const Header: React.FC<IProps> = (props) => {

    return ( 
        <header>
            <nav className="flex gap-10">
                <input className="bg-red-300 p-2 border border-red-400" type="text" value={props.searchInput} onChange={(event: React.ChangeEvent<HTMLInputElement>)=> props.setSearchInput(event.target.value)} />
                <select onChange={(event: React.ChangeEvent<HTMLSelectElement>)=> props.setSelectLanguage(event.target.value)} className="bg-red-300 p-3 border border-red-400" name="language" id="language">
                <option value="en">English</option>
            <option value="de">German</option>
            <option value="fr">French</option>
            <option value="nl">Dutch</option>
            <option value="ru">Russian</option>
                </select>
                <select onChange={(event: React.ChangeEvent<HTMLSelectElement>)=> props.setSelectFilter(event.target.value)} className="bg-red-300 p-3 border border-red-400" name="filter" id="filter">
                <option value="relevancy">Relevancy</option>
            <option value="popularity">Popularity</option>
            <option value="publishedAt">Date</option>
                </select>
            </nav>
        </header>
     )
}
 
export default Header;

export interface IProps {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    setSelectLanguage: React.Dispatch<React.SetStateAction<string>>;
    setSelectFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<IProps> = (props) => {


    return ( 
        <header>
            <h1>Choose your News</h1>
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
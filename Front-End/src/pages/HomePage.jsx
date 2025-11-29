import TextbookList from "../components/textbook_list.jsx";
import TextbookSearch from "../components/textbook_search.jsx";
import Textbooks1 from "../../images/textbooks1.jpg";
import {useEffect, useState} from "react";
import Mathtextbook from "../../images/math-textbook.jpg";
import { getTextbookList } from "../api.jsx";


export default function Homepage() {
    const [textbooks, setTextbooks] = useState([]);
    const [searchResults, setSearchResults] = useState(textbooks);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        try{
            getTextbookList().then(data => {
                console.log(data.textbooks);
                setTextbooks(data.textbooks);
                setSearchResults(data.textbooks);
                setLoading(false);
            });
        } catch (error) {
            console.error("Error fetching textbooks:", error);
            setLoading(false);
        }
    }, []);

    return (
        <>
              {/* Dummy textbook card*/}
              <div className="container my-5">
                <img
                  src={Textbooks1}
                  className="img-fluid"
                  alt="Pile of textbooks"
                  style={{ height: "500px" }}
                />
              </div>

              <TextbookSearch textbooks={textbooks} setSearchResults={setSearchResults} />
              <TextbookList textbooks={searchResults} />
            </>
    );
}
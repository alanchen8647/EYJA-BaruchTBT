import TextbookList from "../components/textbook_list.jsx";
import TextbookSearch from "../components/textbook_search.jsx";
import Textbooks1 from "../../images/textbooks1.jpg";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getTextbookList } from "../api.jsx";


export default function Homepage() {
    //State variables for textbooks, search results, and loading status.
    const [textbooks, setTextbooks] = useState([]);
    const [searchResults, setSearchResults] = useState(textbooks);
    const [loading, setLoading] = useState(true);

    //Fetches the list of textbooks from the backend when the component mounts.
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
        <div className="homepage-wrapper">
            {/* Hero Section */}
            <div className="hero-section text-center">
                <div className="container">
                    <h1 className="display-4 fw-bold mb-3">
                        Find Your Textbooks <br /> For Less
                    </h1>
                    <p className="lead text-white-50 mb-4">
                        The best place for Baruch students to buy and sell textbooks. 
                        Save money and help your community.
                    </p>
                    
                    {/* Integrated Search */}
                    <div className="d-flex justify-content-center">
                        <div className="w-75">
                             <TextbookSearch textbooks={textbooks} setSearchResults={setSearchResults} />
                        </div>
                    </div>

                    <div className="mt-4 d-flex gap-3 justify-content-center">
                        <Link to="/sell" className="btn btn-outline-light btn-lg">Sell a Book</Link>
                    </div>
                </div>
            </div>

            <div className="container" id="search">
                {/* Removed redundant search container */}
                
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <TextbookList textbooks={searchResults} />
                )}
            </div>
        </div>
    );
}
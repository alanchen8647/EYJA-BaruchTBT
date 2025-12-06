import TextbookList from "../components/textbook_list.jsx";
import TextbookSearch from "../components/textbook_search.jsx";
import Textbooks1 from "../../images/textbooks1.jpg";
import {useEffect, useState} from "react";
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
            <section className="hero-section text-center py-5 mb-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 text-lg-start">
                            <h1 className="display-4 fw-bold mb-3" style={{ background: 'linear-gradient(to right, var(--primary-color), var(--accent-color))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Find Your Textbooks <br /> For Less
                            </h1>
                            <p className="lead text-muted mb-4">
                                The best place for Baruch students to buy and sell textbooks. 
                                Save money and help your community.
                            </p>
                            
                            {/* Integrated Search */}
                            <div className="mb-4">
                                <TextbookSearch textbooks={textbooks} setSearchResults={setSearchResults} />
                            </div>

                            <div className="d-flex gap-3 justify-content-lg-start justify-content-center">
                                <a href="/sell" className="btn btn-outline-light btn-lg">Sell a Book</a>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <div className="position-relative">
                                <div className="absolute-bg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(0,0,0,0) 70%)', zIndex: -1 }}></div>
                                <img
                                    src={Textbooks1}
                                    className="img-fluid rounded-4 shadow-lg glass-panel p-2"
                                    alt="Pile of textbooks"
                                    style={{ transform: 'rotate(-2deg)' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
import { Link } from "react-router-dom";
import TextbookCard from "../cards/textbook_card.jsx";


export default function TextbookList({textbooks}) {
    return (
                      <div className="container">
                        <div className="row g-4">
                          {textbooks.map((textbook) => (
                            <TextbookCard key={textbook.id} textbook={textbook} />
                          ))}
                        </div>
                      </div>
    )   
}
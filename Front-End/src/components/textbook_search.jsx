import React, { useState } from "react";

function TextbookSearch({ textbooks, setSearchResults }) {
    const [query, setQuery] = useState("");
    const trimmedQuery = query.trim().toLowerCase();
    //Filters textbooks based on the search query.
    const matchingTextbooks =
        trimmedQuery.length === 0
            ? textbooks
            : textbooks.filter((book) =>
                    ((book.title || "").toLowerCase().includes(trimmedQuery) ||
                     (book.author || "").toLowerCase().includes(trimmedQuery))
                );

    //Handles the form submission to update search results.
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchResults(matchingTextbooks);
    };
    //Renders the search form.
    return (
        <div className="position-relative">
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Enter title or author"
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-outline-primary" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
}

export default TextbookSearch;
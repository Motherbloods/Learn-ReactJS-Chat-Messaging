function MessageSearch({ searchValue, setSearchValue, handleSearch, searchResultCount, handlePrevious, handleNext, searchResultsLabel }) {
    return (
        <div style={{ marginTop: '20px' }}>
            <input
                type="text"
                id="searchInput"
                placeholder="Cari pesan..."
                value={searchValue}
                style={{ width: '70%', padding: '8px' }}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
                onClick={handleSearch}
                style={{ padding: '8px 12px', marginLeft: '10px' }}
            >
                Cari
            </button>
            {searchValue && searchResultCount > 0 && (
                <div className="search-navigation" style={{ marginTop: '10px' }}>
                    <p style={{ fontStyle: 'italic' }}>
                        Found {searchResultCount} messages containing "<strong>{searchValue}</strong>"
                    </p>
                    <div className="navigation-buttons">
                        <button
                            onClick={handlePrevious}
                            style={{ marginRight: '10px' }}
                            aria-label="Previous result"
                        >
                            ⬅️ Previous
                        </button>
                        <button
                            onClick={handleNext}
                            aria-label="Next result"
                        >
                            Next ➡️
                        </button>
                    </div>
                    <p className="search-status" style={{ fontSize: '12px', marginTop: '5px' }}>
                        {searchResultsLabel}
                    </p>
                </div>
            )}
        </div>
    );
}

export default MessageSearch;
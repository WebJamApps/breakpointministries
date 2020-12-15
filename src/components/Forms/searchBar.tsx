import React from 'react';

const SearchBar = (keyword: string, setKeyword: any): JSX.Element => {
  const BarStyle = {
    background: '#F2F1F9', padding: '0.5rem',
  };
  return (
    <div>
      <form id="searchForm" role="search" method="get">
        <div>
          <label className="screen-reader-text" htmlFor="searchBar">
            <span className="sr-search-bar">Search for:</span>
            <input
              id="searchBar"
              type="text"
              className="searchBar"
              style={BarStyle}
              key="searchTerm"
              value={keyword}
              placeholder="Search..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input
              id="searchSubmit"
              className="searchSubmit"
              type="submit"
              value=""
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

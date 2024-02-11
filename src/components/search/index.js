import data from '../../data.json';
import React, {useEffect, useState} from 'react';
import './search.css';

function Search () {
		const [searchUrl, setSearchUrl] = useState('');
		const [searchResult, setSearchResult] = useState([]);
		const [numberOfResults, setNumberOfResults] = useState(0);
		const [searchTime, setSearchTime] = useState(0);

		const handleSearch = () => {
				const startTime = performance.now();
				setSearchResult([]);
				setNumberOfResults(0);
				setSearchTime(0);

				// Check if searchUrl is not empty and present in the companies object
				if (searchUrl && searchUrl in data.companies) {
						// Retrieve phone numbers associated with the searched URL
						const phoneNumbers = data.companies[searchUrl].phones;

						// Update searchResult state with the phone numbers found
						setSearchResult(phoneNumbers);
						setNumberOfResults(phoneNumbers.length);
						setSearchTime(0);

				} else {
						// If searchUrl is empty or not found in the companies object, display a message or take appropriate action
						console.log(`No data found for ${searchUrl}`);
						return (<div className="container">
						</div> )
				}
				// Calculate the elapsed time
				const endTime = performance.now();
				const elapsedTime = endTime - startTime;
				// Update the search time state
				setSearchTime(elapsedTime)

		};

		useEffect(() => {
				handleSearch();
		}, [data, searchUrl]);

		return (<div className="container">
				<input type="text" value={searchUrl} className="searchInput"
				       onChange={(e) => setSearchUrl(e.target.value)}
				       placeholder="ex: http://www.company1.com">
				</input>
				{numberOfResults === 0 && <ul className="searchResult">
								<p className="searchInfo">Nada aqui por enquanto ;)</p>
				</ul>}
				{numberOfResults !== 0 &&
				<ul className="searchResult">
						<div className="response">
								<p className="searchInfo">Foram encontrados {numberOfResults} resultados
										em {searchTime.toFixed(2)} milissegundos </p>
								{searchResult.map((phoneNumber, index) => (
										<li className="numbersFound" key={index}>{phoneNumber}</li>))}
						</div>
				</ul>}
		</div>);
}

export default Search;

import {useState,createContext} from 'react'
import axios from 'axios'

export const DataContext = createContext();

export function DataContextProvider(props){

	const [movies, setMovies] = useState(null);
	const [tvShows, setTvShows] = useState(null);

	const [results, setResults] = useState(null)
	const [searchItem, setSearchItem] = useState(null)

	async function getData(category,setData,pageNumber,slicing=null){
			let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${category}/week?api_key=14e66f854e9919e2bea9065f6d24d42a&page=${pageNumber}`)
			if(slicing){
				setData(data.results.slice(slicing.from,slicing.to));
			}else{
				setData(data.results);
			}
	}

	async function getSearch(searchItem){
		if(searchItem.length>=1){
			let {data} = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=14e66f854e9919e2bea9065f6d24d42a&query=${searchItem}&page=1&include_adult=false`)
			setResults(data.results)
		}else{
			setResults(null)
		}
	}

	return <DataContext.Provider value={ {
		movies:movies,
		setMovies:setMovies,
		tvShows:tvShows,
		setTvShows:setTvShows,
		getData:getData,
		setSearchItem:setSearchItem,
		getSearch:getSearch,
		results:results,
		setResults:setResults,
		searchItem:searchItem
		} }>
		{props.children}
	</DataContext.Provider>
}
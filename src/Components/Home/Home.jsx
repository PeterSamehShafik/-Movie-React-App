import React ,{useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import {DataContext} from '../../Context/dataStore'


export function Home() {
const {movies,setMovies,tvShows,setTvShows,getData} = useContext(DataContext)
	

	useEffect(()=>{
		getData('tv',setTvShows,1,{from:0,to:10});
		getData('movie',setMovies,1,{from:0,to:10});
	}
	,[])

	return <>

		{movies&&tvShows?
			<div className='container mt-4'>
				<div className='movies'>
					<div className='row gy-1  align-items-center'>
						<div className='col-md-4 d-flex'>
							<div className='trending'>
								<h3 className='w-75 pe-4'>Trending Movies to Watch Now </h3>
								<p className='text-muted'>Most watched movies by week</p>
							</div>
						</div>
						{movies.map( (movie,idx)=>
							<div key={idx} className='col-lg-2 col-md-4'>
								<Link to={`/details/movie/${movie.id}`}>
									<div className='item position-relative'>
										<div className='rating bg-info position-absolute p-3 top-0 end-0'>
											<span>{movie.vote_average.toPrecision(2)}</span>
										</div>
										<img  className='img-fluid' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="img-alt" />
										<h4 className='h6 item-name mt-1'>{movie.title}</h4>
									</div>
								</Link>
							</div>

						 )}
					</div>
				</div>
				<hr />
				<div className='tv'>
					<div className='row gy-1 align-items-center'>
						<div className='col-md-4 d-flex'>
							<div className='trending'>
								<h3 className='w-75 pe-4'>Trending Tv Shows to Watch Now </h3>
								<p className='text-muted'>Most watched Tv Shows by week</p>
							</div>
						</div>
						{tvShows.map( (tvShow,idx)=>
							<div key={idx} className='col-lg-2 col-md-4'>
								<Link to={`/details/tv/${tvShow.id}`}>
									<div className='item position-relative'>
										<div className='rating bg-info position-absolute p-3 top-0 end-0'>
											<span>{tvShow.vote_average.toPrecision(2)}</span>
										</div>
										<img  className='img-fluid' src={`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`} alt="img-alt" />
										<h4 className='h6 item-name mt-1'>{tvShow.name}</h4>
									</div>
								</Link>
							</div>

						 )}
					</div>
				</div>
			</div> 
			:  
			<div className="loading-screen align-items-center justify-content-center">
			  <div className="lds-hourglass"></div>
			</div>
		 }


		
		
	</>
	
}
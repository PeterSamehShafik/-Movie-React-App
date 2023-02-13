import React, { useEffect, useState } from 'react'
import './Details.css'
import {useParams, useNavigate} from 'react-router-dom' 
import axios from 'axios'


export function Details() {
	let navigate= useNavigate()
	let {id,category} =  useParams();
	const [item, setItem] = useState(null)
	const [genres, setGenres] = useState(null)


	async function getData(){
		let {data} = await axios.get(`https://api.themoviedb.org/3/${category}/${id}?api_key=14e66f854e9919e2bea9065f6d24d42a&language=en-US`)
		.catch(function(err){
			if(err.response.status == 404){
				navigate('/404')
			}
		})
		setItem(data);
		setGenres(data.genres)
	}


	useEffect(() => { //did mount
		getData();
	}, [])


	return <>

		{item?
			<div className='container mt-4'>
				<div className='row align-items-center'>
					<div className='col-lg-5'>
						<img className='img-fluid' src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="myImg" />
					</div>
					<div className='col-lg-7 py-4'>
						 <div className='info-content'>
								<h2 className='display-5 mb-3'>{ category==='tv'?item.name:item.title}</h2>
								<h3 className='txt text-muted '>{item.tagline}</h3>
								<div className='genres my-5'>
									<div className='row gy-5'>
										{genres.map( (genre,idx)=>
											<div key ={idx} className='col-lg-3'>
												<div className='p-3 bg-info'>
													<span>{genre.name}</span>
												</div>
											</div> 
										 )}
									</div>
								</div>
								<div className='item-info'>
									<h3 className='my-5'>Vote: {item.vote_average.toPrecision(2)}</h3>
									<h3 className='my-5'>Vote Count: {item.vote_count}</h3>
									<h3 className='my-5'>Popularity: {item.popularity}</h3>
									{item.release_date? <h3 className='my-5'>Release data: {item.release_date}</h3>:''}
								</div>
								<h4 className='txt text-muted'>{item.overview}
								</h4>
						</div>
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
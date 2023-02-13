import React ,{useState, useEffect, useContext} from 'react'
import {DataContext} from '../../Context/dataStore'
import {Link} from 'react-router-dom'


export function Results() {

	const {results,getSearch,searchItem} = useContext(DataContext)


	useEffect(()=>{
		getSearch(searchItem);
	}
	,[])

	return <>
		{results?
			<div className='container mt-4'>
				<div className='item mb-5'>
					<div className='row gy-1 align-items-center justify-content-center'>
						{results.map( (item,idx)=>
							<div key={idx} className='col-lg-3 col-md-5'>
								<Link to={`/details/tv/${item.id}`}>
									<div className='item position-relative'>
										<div className='rating bg-info position-absolute p-3 top-0 end-0'>
											<span>{item.vote_average.toPrecision(2)}</span>
										</div>
										<img  className='img-fluid' src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="img-alt" />
										<h3 className='h6 item-name mt-1'>{item.name}</h3>
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
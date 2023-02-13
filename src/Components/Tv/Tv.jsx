import React ,{useState, useEffect,useContext} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {DataContext} from '../../Context/dataStore'

export function Tv() {

	const {tvShows,setTvShows,getData} = useContext(DataContext)
	const [pages, setPages] = useState([0,1,2])
	// let totalNum = new Array(20).fill(0).map( (e, idx)=> idx+1 ) 

	function setPage(e){
		setTvShows(null)
		let btn = e.target.innerHTML;
		let pageNumber;
		let crrPage= document.getElementById('crrPage')
		if(btn==='Previous'){
			pageNumber =Number( crrPage.innerHTML)-1
		}else if(btn ==='Next'){
			pageNumber =Number( crrPage.innerHTML)+1
		}else{	
			pageNumber =Number( btn )
		}
			setPages([pageNumber-1,pageNumber,pageNumber+1])
			getData('tv',setTvShows,pageNumber);
	}

	useEffect(()=>{
		getData('tv',setTvShows,1);
	}
	,[])


	return <>

		{tvShows?
			<div className='container mt-4'>
				<div className='tv mb-5'>
					<div className='row gy-1 align-items-center justify-content-center'>
						<h2>Page: {pages[1]}</h2>
						{tvShows.map( (tvShow,idx)=>
							<div key={idx} className='col-lg-3 col-md-5'>
								<Link to={`/details/tv/${tvShow.id}`}>
									<div className='item position-relative'>
										<div className='rating bg-info position-absolute p-3 top-0 end-0'>
											<span>{tvShow.vote_average.toPrecision(2)}</span>
										</div>
										<img  className='img-fluid' src={`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`} alt="img-alt" />
										<h3 className='h6 item-name mt-1'>{tvShow.name}</h3>
									</div>
								</Link>
							</div>

						 )}
					</div>
				</div>

			<nav aria-label="page">
			  <ul className="pagination ">
			    <div className='container'>
			    	<div className='row gx-0 justify-content-center'>				
					    {pages[0]!=0? 
					    	<>
						    	<li className="page-item">
						     	 <span onClick={setPage} className="page-link p-3 bg-transparent">Previous</span>
						    	</li>
						    	<li className="page-item"><span onClick={setPage} className="page-link p-3 bg-transparent" >{pages[0]}</span></li>
					    	</>
					    	:'' }
					    
					    <li className="page-item active" aria-current="page">
					     	 <span onClick={setPage} className="page-link p-3 bg-white text-black disabled" id='crrPage'>{pages[1]}</span>
					    </li>
					    <li className="page-item"><span onClick={setPage} className="page-link p-3 bg-transparent">{pages[2]}</span></li>
					    <li className="page-item">
					    	  <span onClick={setPage} className="page-link p-3 bg-transparent">Next</span>
					    </li>

				    	{/* {totalNum.map( (page, idx) =>  */}
			    		{/* 	<div key={idx} className='pg-num col-md-2 col-1' style={currentPage==page?activePage:{"color":"#fff !important"}}> */}
					    {/* 		<li onClick={setPage} className="page-item m-0"> */}
					    {/* 			<span className="page-link p-3 bg-transparent">{page}</span> */}
					    {/* 		</li> */}
			    		{/* 	</div> */}
				    	{/* )} */}


			    		</div>
			    	</div>
			  </ul>
			</nav>
			</div> 
			:
			<div className="loading-screen align-items-center justify-content-center">
				<div className="lds-hourglass"></div>
			</div>
		 }
		
	</>
}
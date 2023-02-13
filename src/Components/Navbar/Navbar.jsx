import React,{useContext} from 'react';
import { NavLink,useNavigate} from 'react-router-dom';
import './Navbar.css'
import {DataContext} from '../../Context/dataStore'

export  function Navbar( { currentUser, clearUserData } ) {
	const {setSearchItem,setResults} = useContext(DataContext)
	let navigate = useNavigate()
	

	function sendSearchData(e){
		if(e.target.value.length>=1){
			setSearchItem(e.target.value)
			navigate('/results')
		}else{
			setResults(null)
			navigate('/home')
		}
	}

	return (
		<nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
		  <div className="container-fluid">
		    <NavLink className="navbar-brand fa-2x fw-bolder" to="/">Noxe</NavLink>
		    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarSupportedContent">
		      	
		    	{currentUser? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
			        <li className="nav-item">
			          	<NavLink className="nav-link" to='/home'>Home</NavLink>
			        </li>
			        <li className="nav-item">
			         	 <NavLink className="nav-link" to='/movies'>Movies</NavLink>
			        </li>
			        <li className="nav-item">
			        	  <NavLink className="nav-link" to='/tv'>Tv</NavLink>
			        </li>
					<li className="nav-item">
	  		         	 <NavLink className="nav-link" to='/people'>People</NavLink>
	  		        </li>
	  		        <li className="nav-item">
	  		        	  <NavLink className="nav-link" to='/about'>About</NavLink>
	  		        </li>
	  		        <li className="nav-item">
						<NavLink className="nav-link" to='/networks'>Networks</NavLink>
	  		        </li>		  
				</ul>: ''}


		      <ul className='navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center'>
		      	<form className="d-flex order-last order-lg-first" role="search"  >
		        	{currentUser? 
		        		<input onChange ={sendSearchData} className="form-control me-2" type="search" placeholder="Search Tv Shows" aria-label="Search"/>
		        	 :  <input className="form-control me-2 bg-transparent" type="search" placeholder="Search Tv Shows" aria-label="Search" disabled/> }
		        	
		        	
		      	</form>
		      	<li className='social-icon order-lg-first order-last'>
			      	<i className='text-white px-2 fa-brands fa-facebook'></i>
			      	<i className='text-white px-2 fa-brands fa-spotify'></i>
			      	<i className='text-white px-2 fa-brands fa-instagram'></i>
			      	<i className='text-white px-2 fa-brands fa-youtube'></i>
		      	</li>

		      	{currentUser?
		      		<>
			       		<span className='ms-lg-3 ms-auto text-warning'>{currentUser.user.first_name} {currentUser.user.last_name}</span>
			      		<li className="nav-item">
			         		 <span onClick={clearUserData} className="nav-link">Logout</span>
			       		</li>
		       		</>
		      		:
		      		<>
				      <li className="nav-item">
				       		<NavLink className="nav-link" to='/login'>Login</NavLink>
				       </li>
				       <li className="nav-item">
				       		<NavLink className="nav-link" to='/register'>Register</NavLink>
				       </li>
				    </>
		      	}
		      </ul>
		      
		    </div>
		  </div>
		</nav>
	)
	
}
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'

export function Login({ decodeToken }) {
	const navigate = useNavigate()

	const [backEndErr, setBackEndErr] = useState(null)
	const [errList, setErrList] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const [user, setUser] = useState({
		"email": "",
		"password": ""
	})

	function getUser(e) {
		setBackEndErr(null)
		setErrList(null)
		let userData = { ...user }
		userData[e.target.name] = e.target.value;
		setUser(userData)
	}

	function validateUser() {
		const schema = Joi.object({
			email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
			password: Joi.string().min(8)
		})

		let { error } = schema.validate(user, { abortEarly: false });
		if (error) {
			setErrList(error.details)
			setIsLoading(false)
		} else {
			return true;
		}


	}

	async function sumbitForm(e) {
		e.preventDefault();
		setIsLoading(true)

		if (validateUser()) {
			let result = await axios.post("https://be-server-movie-notes.vercel.app/auth/signin", user).catch(function (error) {
				if (error.response) {
					setBackEndErr(error.response.data.message)
				setIsLoading(false);

				}
			})
			if (result?.data?.message === "done") {
				localStorage.setItem("tkn", result.data.token)
				decodeToken()
				navigate('/home')
				setIsLoading(false);
			}
		}
	}


	return <>
		<div className='registeration-form d-flex justify-content-center align-items-center'>
			<div className='container'>
				<h2 className='h1'>Login</h2>

				{backEndErr ?
					<div className='alert alert-danger p-2'>{backEndErr}
					</div>
					: ''
				}

				{errList?.map((err, idx) =>
					<div key={idx} className="alert alert-danger p-2">
						{err.message}
					</div>)}


				<form onSubmit={sumbitForm}>
					<label htmlFor="email" className=' my-2 form-label'>Email: </label>
					<input onChange={getUser} type="email" className=' mb-2 form-control' id='email' name='email' />

					<label htmlFor="password" className=' my-2 form-label'>Password: </label>
					<input onChange={getUser} type="password" className=' mb-2 form-control' id='password' name='password' />

					<button className='btn btn-primary mt-3' type='submit'> {
						isLoading ? <div className="lds-dual-ring"></div>
							: 'Sign in'
					}</button>
				</form>
			</div>
		</div>

	</>
}
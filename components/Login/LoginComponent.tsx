import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginComponent = () => {

	const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
	const [submitted, setSubmitted] = useState(false);
	const router = useRouter();

	const { signIn, errorMessage, removeError, status } = useContext(AuthContext);

	useEffect(() => {
		if (status === 'authenticated')
			router.push('/home')
	}, [status])


	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			message: '',
		},
		onSubmit: ({ email, password }) => {
			setMessage('Form submitted');
			signIn({ email, password });
			setSubmitted(true);
		},
		validationSchema: yup.object({
			password: yup.string().trim().required('Password is required'),
			email: yup
				.string()
				.email('Must be a valid email')
				.required('Email is required'),
		}),
	});

	return (
		<div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
			<div className="w-full sm:max-w-md p-5 mx-auto">
				<h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
				<form onSubmit={formik.handleSubmit}>
					<div className="mb-4">
						<label className="block mb-1" htmlFor="email">Email-Address</label>
						<input
							id="email"
							type="text"
							name="email"
							className="bg-white py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.errors.email && (
							<div className="text-amber-900">{formik.errors.email}</div>
						)}
					</div>
					<div className="mb-4">
						<label className="block mb-1" htmlFor="password">Password</label>
						<input
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							id="password"
							type="password"
							name="password"
							className="bg-white py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
						/>
						{formik.errors.password && (
							<div className="text-amber-900">{formik.errors.password}</div>
						)}
					</div>
					<div className="mt-6 flex items-center justify-between">
						<div className="flex items-center">
							<input id="remember_me" type="checkbox" className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
							<label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
						</div>
						<a href="#" className="text-sm"> Forgot your password? </a>
					</div>
					<div className="mt-6">
						<button
							type="submit"
							className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">
							Sign In
						</button>
					</div>
					<div className="mt-6 text-center">
						<Link href={`/register`}>
							<a className="underline">Sign up for an account</a>
						</Link>
					</div>
					<div className={`text-amber-900 ${submitted ? 'block' : 'hidden'}`}>
						{errorMessage}
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginComponent
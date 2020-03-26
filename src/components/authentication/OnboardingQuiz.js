import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendUserGenres } from '../../actions'
import styled from 'styled-components';
import { Checkbox } from 'antd';

const OnboardingQuizContainer = styled.div`
	width: 90%;
	margin: 0 auto;

	h1 {
		padding-top: 32px;
		margin-bottom: 8px;
		font-family: 'Frank Ruhl Libre', sans-serif;
		font-size: 2rem;
		font-weight: bold;
		color: #3b403d;
		line-height: 41px;
	}

	.select {
		margin-bottom: 24px;
		font-family: 'Open Sans', sans-serif;
		color: #4e4c4a;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		.ant-checkbox-group {
			margin-bottom: 24px;

			.ant-checkbox-group-item {
				width: 50%;
				margin: 0 0 8px;

				span {
					font-family: 'Open Sans', sans-serif;
					font-size: 0.875rem;
					color: #4e4c4a;
				}
			}
		}

		button {
			padding: 10px 32px;
			background-color: #d24719;
			border: none;
			border-radius: 4px;
			font-family: 'Open Sans', sans-serif;
			color: #ffffff;
		}
	}
`;

const OnboardingQuiz = props => {
	const [checkedGenres, setCheckedGenres] = useState([]);

	const onChange = checkedValues => {
		setCheckedGenres(checkedValues);
	};

	const onSubmit = event => {
		event.preventDefault();
	};

	const genres = ['Art', 'Biography', 'Business', 'Chick Lit', 'Christian', 'Classics', 'Comics', 'Contemporary', 'Cookbooks', 'Graphic Novels', 'Historical Fiction', 'History', 'Horror', 'Humor & Comedy', 'Manga', 'Memoir', 'Music', 'Mystery', 'Nonfiction', 'Paranormal', 'Philosophy', 'Poetry', 'Psychology', 'Religion', 'Romance', 'Science', 'Science Fiction', 'Self Help', 'Suspense', 'Spirituality', 'Sports', 'Thriller', 'Travel', 'Young Adult'];

	return (
		<OnboardingQuizContainer>
			<h1>Select your favorite genres</h1>
			<p className='select'>Select at least one genre to continue</p>
			<form onSubmit={onSubmit}>
				<Checkbox.Group options={genres} onChange={onChange} />
				<button type='submit'>Continue</button>
			</form>
		</OnboardingQuizContainer>
	);
};

export default connect(null, { sendUserGenres })(OnboardingQuiz);

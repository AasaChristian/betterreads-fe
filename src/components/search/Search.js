import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PageView, Event } from '../tracking/';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Header from '../common/Header';
import Breadcrumbs from '../common/Breadcrumbs';
import SearchForm from './SearchForm';
import BookList from '../common/BookList';
import ShelfNote from '../common/ShelfNote';
import styled from 'styled-components';
import ShelfContainer from '../common/ShelfContainer';

const Wrapper = styled.div`
	@media (min-width: 1120px) {
		.somethingClever{
			width: 1120px;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.bookList{
				width: 72%;
			}

			.shelfList{
				width: 26%;
			}
		}

		.spinnerContainer {
			width: 90%;
			height: 100vh;

			margin-top: 4rem;
		}
	}
`;

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />

const Search = props => {
	useEffect(() => {
		Event('Search', 'loaded search', 'SEARCH_COMPONENT');
		PageView();
	}, []);
	
	return (
		<Wrapper>
			<Header history={props.history} />	
			<SearchForm history={props.history} />
			<Breadcrumbs history={props.history} crumbs={[{label: "Search", path: null}]} />
			{
				!props.searchResults.books && <ShelfNote note="Search for your favorite title or author." />
			}
			{
				props.searchResults.books &&
				<ShelfNote note={`${props.searchResults.books.totalItems} results for "${props.searchResults.query}"`} />
			}
			<div className="somethingClever">
				{
					props.fetching && <div className="bookList"><div className="spinnerContainer"><Spin indicator={antIcon} /></div></div>
				}
				{
					!props.fetching &&
					!props.searchResults.books &&
						<div className="bookList">&nbsp;</div>
				}
				
				{
					!props.fetching &&
					props.searchResults.books &&
					<div className="bookList">
						<BookList history={props.history} bookList={props.searchResults.books.items} count={props.searchResults.books.totalItems} query={props.searchResults.query} />
					</div>
				}
				<div className="shelfList">
					<ShelfContainer history={props.history} />
				</div>
			</div>
		</Wrapper>
	);
};

const mapStateToProps = state => {
	return {
		fetching: state.search.fetching,
		searchResults: state.search.searchResults
	};
};

export default connect(mapStateToProps)(Search);

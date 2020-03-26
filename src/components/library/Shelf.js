import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setCurrentShelf } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../common/Breadcrumbs';
import ShelfNote from '../common/ShelfNote';
import BookCardList from '../common/BookCardList';
import MyShelves from '../common/MyShelves';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
import styled from 'styled-components';
import { PageView, Event } from '../../utils/tracking';

const ShelfContainer = styled.div`
	@media(min-width: 1120px) {
		width: 1120px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
`;

const Shelf = props => {
	useDocumentTitle('Readrr - Shelf');

	const shelf = props.match.params.shelf;
	
	useEffect(() => {
		props.setCurrentShelf(shelf);
		Event('Shelf', 'A user looked at a shelf of books', 'SHELF');
		PageView();
	}, []);

	return (
		<>
			<Header history={props.history} />
			<SearchForm history={props.history} />
			<Breadcrumbs history={props.history} crumbs={[{ label: props.currentShelf.name, path: null }]} />
			<ShelfContainer>
				{props.currentShelf && props.currentShelf.name && props.currentShelf.books && <BookCardList history={props.history} books={props.currentShelf.books} source={'library'} label={props.currentShelf.name} />}
				<MyShelves history={props.history} source={'shelf'} />
			</ShelfContainer>
		</>
	);
};

const mapStateToProps = state => {
	return {
		currentShelf: state.library.currentShelf
	};
};

export default connect(mapStateToProps, { setCurrentShelf })(Shelf);

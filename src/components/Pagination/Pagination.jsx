import React from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = data => {
    onPageChange(data.selected + 1);
  };

  return (
    <div className={css.pagination}>
      <ReactPaginate
        previousLabel="«"
        nextLabel="»"
        breakLabel="..."
        breakClassName={css.ellipsis}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={`${css.pagination} ${css.pagesWrapper}`}
        activeClassName={css.active}
        disabledClassName={css.buttonFlip}
        previousClassName={css.buttonFlip}
        nextClassName={css.buttonFlip}
        pageClassName={css.button}
        pageLinkClassName={css.button}
        breakLinkClassName={css.ellipsis}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;

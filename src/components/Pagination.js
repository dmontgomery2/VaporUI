import React from 'react'

export const Pagination = ({itemsPerPage, totalItems, paginate, currentPage}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <div className="Pagination">
        <p>page: </p>    
        {pageNumbers.map(number => <button className = 
        {number == currentPage ? "selected-button" : "neutral-button"} onClick={() => paginate(number)}>
                            {number}
                        </button>)}
        </div>
    )
}
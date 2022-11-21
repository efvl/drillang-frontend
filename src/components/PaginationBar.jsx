import React from "react";
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';

const PaginationBar = ({currentPage, totalPages, onChangePage}) => {

    console.log(currentPage + ' of ' + totalPages);
    let items = [];
    let start = 0;
    let end = totalPages;
 
    items.push(<Pagination.First key="first" disabled={currentPage <= 0} onClick={() => onChangePage(0)}/>);
    items.push(<Pagination.Prev key="prev" disabled={currentPage <= 0}  onClick={() => onChangePage(currentPage - 1)}/>);
    for(let page = start; page < end; page++){
        items.push(
            <Pagination.Item key={page} data-page={page} active={page === currentPage} onClick={() => onChangePage(page)}>
                {page}
            </Pagination.Item> 
        )
    }
    items.push(<Pagination.Next key="next" disabled={currentPage >= (totalPages-1)} onClick={() => onChangePage(currentPage + 1)}/>)
    items.push(<Pagination.Last key="last" disabled={currentPage >= (totalPages-1)} onClick={() => onChangePage(totalPages - 1)}/>);

    return (
        <Container className="py-2">
            <Pagination>
                {items}
            </Pagination>
        </Container>    
    );

};

export default PaginationBar;
import React from "react";
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';

interface PaginationBarProps {
    currentPage?:number;
    totalPages?:number;
    onChangePage: (id: number) => void;
}

const PaginationBar = (props:PaginationBarProps) => {

    console.log(props.currentPage + ' of ' + props.totalPages);
    let items = [];
    let start = 0;
    let end = props.totalPages;
 
    items.push(<Pagination.First key="first" disabled={props.currentPage <= 0} onClick={() => props.onChangePage(0)}/>);
    items.push(<Pagination.Prev key="prev" disabled={props.currentPage <= 0}  onClick={() => props.onChangePage(props.currentPage - 1)}/>);
    for(let page = start; page < end; page++){
        items.push(
            <Pagination.Item key={page} data-page={page} active={page === props.currentPage} onClick={() => props.onChangePage(page)}>
                {page}
            </Pagination.Item> 
        )
    }
    items.push(<Pagination.Next key="next" disabled={props.currentPage >= (props.totalPages-1)} onClick={() => props.onChangePage(props.currentPage + 1)}/>)
    items.push(<Pagination.Last key="last" disabled={props.currentPage >= (props.totalPages-1)} onClick={() => props.onChangePage(props.totalPages - 1)}/>);

    return (
        <Container className="py-2">
            <Pagination>
                {items}
            </Pagination>
        </Container>    
    );

};

export default PaginationBar;
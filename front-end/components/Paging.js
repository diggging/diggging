import React from "react";
import Pagination from "react-js-pagination";

function Paging({handlePageChange, page, count}) {
  
  return (
    <div>
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        // prevPageText={"‹"}
        // nextPageText={"›"}
        onChange={handlePageChange}
        hideDisabled={true}
        hideNavigation={true}
        // hideFirstLastPages={true} 이거는 있어야 하지 않을까,,,
      />
    </div>
  );
}

export default Paging;

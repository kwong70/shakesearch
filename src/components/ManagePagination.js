import React, { useState } from "react";

export default function ManagePagination(data, ITEMS_PER_PAGE) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / ITEMS_PER_PAGE);

  function currentData() {
    const lowerBound = (currentPage - 1) * ITEMS_PER_PAGE;
    const upperBound = currentPage * ITEMS_PER_PAGE;
    return data.splice(lowerBound, upperBound);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

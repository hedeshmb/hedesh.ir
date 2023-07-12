import React, { useState, useEffect } from "react";
import { getWiki } from "../services/WikiService";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import SearchBox from "./common/SearchBox";
import { getWikiList } from "../demo/WikiData";

const Wiki = () => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 5;

  useEffect(() => {
    async function fetchData() {
      // const { data: items } = await getWiki();
      const items = await getWikiList();
      setList(items);
    }
    fetchData();
  }, []);

  function handlePageChanged(page) {
    setCurrentPage(page);
  }

  function handleSearch(query) {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  let newList = list;
  if (searchQuery)
    newList = list.filter((item) => {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const itemsFiltered = paginate(newList, currentPage, pageSize);

  return (
    <React.Fragment>
      <SearchBox
        value={searchQuery}
        onChange={(query) => handleSearch(query)}
      />
      {itemsFiltered.map((item) => (
        <div className="my-3 p-3 bg-white rounded shadow-sm" key={item.id}>
          <div className="d-flex text-muted pt-1">
            <div className="pb-1 mb-0 small lh-sm w-100">
              <div className="d-flex justify-content-between">
                <strong className="text-gray-dark">{item.title}</strong>
              </div>
              <span className="d-block">
                <a target="_blank" rel="noopener noreferrer" href={item.link}>
                  {item.link}
                </a>
              </span>
            </div>
          </div>
        </div>
      ))}
      <Pagination
        itemCount={newList.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={(page) => handlePageChanged(page)}
      />
    </React.Fragment>
  );
};

export default Wiki;

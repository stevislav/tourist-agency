import "./list.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import DotLoader from "react-spinners/DotLoader";
import Footer from "../../components/footer/Footer";

const List = () => {
  const location = useLocation();

  // definisanje svakog u search pojedinacno
  //
  // posto se fetchuju podaci ovde, potrebno nam je da i ovde imamo promenljive za search, da bi mogao header da ih promeni i onda reFetchuje
  const [search1, setSearch1] = useState(location.state.search1);
  const [search2, setSearch2] = useState(location.state.search2);
  const [search3, setSearch3] = useState(location.state.search3);

  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(location.state.pageSize);
  const [date, setDate] = useState(location.state.dates);
  //console.log(date)

  let fetchString = `/offers?search1=${search1}&search2=${search2}&search3=${search3}&startDate=${date[0]["startDate"]}&endDate=${date[0]["endDate"]}&limit=${limit}&page=${pageNumber}`;

  const { data, loading, error, reFetch, newReFetch } = useFetch(fetchString);
  // console.log(data.length);
  console.log(data);

  // loading animacija
  const loader = (
    <DotLoader
      color={"#7251b5c4"}
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
      className="loader"
    />
  );

  // console.log(loading);
  return (
    <div>
      <Navbar />
      <Header
        type="list"
        refetch={newReFetch}
        setLimit={setLimit}
        setS1={setSearch1}
        setS2={setSearch2}
        setS3={setSearch3}
        setDate={setDate}
        setPageNumber={setPageNumber}
        S1={search1}
        S2={search2}
        S3={search3}
        listDates={date}
      />
      <div className="listContainer">
        {data.length === 0 ? (
          <div className="nOffers">
            No offers exist with current search parameters
          </div>
        ) : (
          <div className="listWrapper">
            <div className="buttonPageWrapper">
              <div className="buttonsPage">
                <button
                  disabled={pageNumber === 1}
                  className="prevPage"
                  onClick={() => {
                    setPageNumber(pageNumber - 1);
                    // reFetch();
                  }}
                >
                  Prev
                </button>
                <label>Page {pageNumber}</label>
                <button
                  disabled={data.length < limit}
                  className="nextPage"
                  onClick={() => {
                    setPageNumber(pageNumber + 1);
                    // reFetch();
                  }}
                >
                  Next
                </button>
              </div>
              <div className="pageSize">
                <label>Items per page</label>
                <select
                  defaultValue={50}
                  onChange={(e) => {
                    setPageNumber(1);
                    setLimit(e.target.value);
                    newReFetch(fetchString);
                  }}
                  className="inputChoose"
                >
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                </select>
              </div>
            </div>

            <div className="listResult">
              {loading ? (
                loader
              ) : (
                <>
                  {data.map((item) => (
                    <SearchItem item={item} key={item._id} />
                  ))}
                </>
              )}
            </div>

            <div className="buttonPageWrapper2">
              <div className="buttonsPage">
                <button
                  disabled={pageNumber === 1}
                  className="prevPage"
                  onClick={() => {
                    setPageNumber(pageNumber - 1);
                    // reFetch();
                  }}
                >
                  Prev
                </button>
                <label>Page {pageNumber}</label>
                <button
                  disabled={data.length < limit}
                  className="nextPage"
                  onClick={() => {
                    setPageNumber(pageNumber + 1);
                    // reFetch();
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default List;

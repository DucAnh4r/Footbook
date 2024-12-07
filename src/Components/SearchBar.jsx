import React, { useState, useEffect, useRef, useMemo } from "react";
import { Input, Button, Spin, notification } from "antd";
import { useNavigate } from "react-router-dom";
import searchImage from "../assets/image/searchImage.svg";
import styles from "./SearchBar.module.scss";
import debounce from "lodash/debounce";
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = (props) => {
  const { isText } = props;

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNoneNoti, setShowNoneNoti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef(null);
  const SearchBarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/category.json");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        if (!data || data.length === 0) {
          throw new Error("JSON is empty or not valid");
        }
        setProducts(data);
        setFilteredProducts([]);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };

    fetchProducts();
  }, []);

  const debouncedFilterProducts = useMemo(
    () =>
      debounce(async (query) => {
        if (query.trim().length === 0) {
          setFilteredProducts([]);
          setIsLoading(false);
          return;
        }

        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(query)
        );

        setFilteredProducts(filtered);
        setShowSuggestions(query.length > 0 && filtered.length > 0);
        setShowNoneNoti(query.length > 0 && filtered.length === 0);
        setIsLoading(false);
      }, 500),
    [products]
  );

  const debouncedNavigate = useMemo(
    () =>
      debounce((query) => {
        navigate(`/search/top?query=${encodeURIComponent(query)}`);
        window.location.reload(); // Reload the page after navigation
      }, 0),
    [navigate]
  );

  const debouncedNavigateProduct = useMemo(
    () =>
      debounce((id) => {
        navigate(`/product/${id}`);
        window.location.reload(); // Reload the page after navigation
      }, 500),
    [navigate]
  );

  useEffect(() => {
    return () => {
      debouncedFilterProducts.cancel();
      debouncedNavigate.cancel();
    };
  }, [debouncedFilterProducts, debouncedNavigate]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts([]);
      setShowSuggestions(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      debouncedFilterProducts(query);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredProducts([]);
    setShowSuggestions(false);
    setShowNoneNoti(false);
  };

  const handleClickOutside = (event) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target) &&
      SearchBarRef.current &&
      !SearchBarRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
      setShowNoneNoti(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const productsToShow = filteredProducts.slice(0, 5);

  const handleSeeMore = () => {
    debouncedNavigate(searchQuery);
  };

  const handleProductClick = (productId) => {
    debouncedNavigateProduct(productId);
  };

  const handleSearchButtonClick = () => {
    debouncedNavigate(searchQuery);
  };

  return (
    <>
      <div className={styles.searchContainer} ref={SearchBarRef}>
        <div className={styles.inputGroup}>
          <Input
            prefix={<FaSearch style={{ fontSize: "18px", color: "#65686c", marginRight: "4px" }} />}
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Tìm kiếm trên Footbook"
            className={styles.formControl}
            onFocus={() => {
              setShowSuggestions(searchQuery.length > 0 && filteredProducts.length > 0);
              setShowNoneNoti(searchQuery.length > 0 && filteredProducts.length === 0);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSeeMore(); // Gọi chức năng "Xem tất cả"
              }
            }}
          />
           {/* {searchQuery && (
              <>
                <div className={styles.clearButton} onClick={clearSearch}>
                  <FaTimes color="#777" size={20} />  
                </div>
                <Button
                  icon={<FaSearch color="#ffffff" />} 
                  onClick={handleSearchButtonClick}
                  className={styles.searchButton}
                />
              </>
            )} */}
        </div>

        {/* Suggestion box */}
        <div
          className={styles.resultsContainer}
          style={{
            display: searchQuery.length > 0 && (showSuggestions || showNoneNoti || isLoading) ? "block" : "none",
          }}
          ref={resultsRef}
        >
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <Spin size="small" />
              <span>Loading...</span>
            </div>
          ) : filteredProducts.length === 0 && searchQuery ? (
            <p className={styles.noResultsMessage}>Không có kết quả trùng khớp.</p>
          ) : (
            <>
              {productsToShow.map((product) => (
                <div
                  key={product.id}
                  className={styles.productItem}
                  onClick={() => handleProductClick(product.id)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <span>{product.name}</span>
                </div>
              ))}
              {filteredProducts.length > 0 && (
                <Button
                  type="link"
                  onClick={handleSeeMore}
                  className={styles.moreButton}
                >
                  Xem tất cả
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;

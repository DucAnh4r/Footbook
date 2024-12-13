import React, { useState, useEffect, useRef, useMemo } from "react";
import { Input, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import styles from "./SearchBar.module.scss";
import debounce from "lodash/debounce";
import { userSearchService } from "../services/userService";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef(null);
  const SearchBarRef = useRef(null);
  const navigate = useNavigate();

  // Debounced fetch suggestions
  const debouncedFetchSuggestions = useMemo(
    () =>
      debounce(async (keyword) => {
        if (!keyword.trim()) {
          setSuggestions([]);
          setShowSuggestions(false);
          setIsLoading(false);
          return;
        }

        try {
          setIsLoading(true);
          const response = await userSearchService({ keyword });
          const data = response?.data || []; // An toàn dữ liệu
          console.log("API Response:", data); // Debug dữ liệu từ API
          setSuggestions(data);
          setShowSuggestions(data.length > 0);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
          setShowSuggestions(false);
        } finally {
          setIsLoading(false);
        }
      }, 500),
    []
  );

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedFetchSuggestions(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target) &&
      SearchBarRef.current &&
      !SearchBarRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (userId) => {
    if (userId) {
      navigate(`/friendprofile/${userId}`); // Chuyển hướng đến trang người dùng
    } else {
      console.warn("User ID is undefined");
    }
  };

  return (
    <div className={styles.searchContainer} ref={SearchBarRef}>
      <div className={styles.inputGroup}>
        <Input
          prefix={
            <FaSearch style={{ fontSize: "18px", color: "#65686c", marginRight: "4px" }} />
          }
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm người dùng"
          className={styles.formControl}
          onFocus={() => {
            if (suggestions?.length > 0) setShowSuggestions(true);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              navigate(`/search/users?query=${encodeURIComponent(searchQuery)}`);
            }
          }}
        />
        {searchQuery && (
          <div className={styles.clearButton} onClick={clearSearch}>
            <FaTimes color="#777" size={20} />
          </div>
        )}
      </div>

      {/* Suggestion box */}
      <div
        className={styles.resultsContainer}
        style={{
          display:
            searchQuery?.length > 0 && (showSuggestions || isLoading) ? "block" : "none",
        }}
        ref={resultsRef}
      >
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Spin size="small" />
            <span>Đang tải...</span>
          </div>
        ) : suggestions?.length > 0 ? (
          suggestions.slice(0, 5).map((user) => (
            <div
              key={user?.userId}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(user?.userId)}
            >
              <img
                src={user?.profilePictureUrl || "https://via.placeholder.com/50"}
                alt={user?.username || "User"}
                className={styles.avatar}
              />
              <span>{user?.username || "Unknown User"}</span>
            </div>
          ))
        ) : (
          <p className={styles.noResultsMessage}>Không tìm thấy kết quả phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

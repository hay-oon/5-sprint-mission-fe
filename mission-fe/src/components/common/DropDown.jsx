import { useState } from "react";
import toggleIcon from "../../assets/icons/ic_arrow_down.png";

function DropDown({ orderBy, setOrderBy }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // dropdown handler
  const handleSortChange = (value) => {
    setOrderBy(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        className="dropdownButton"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {orderBy === "recent" ? "최신순" : "좋아요순"}
        <img src={toggleIcon} alt="토글" width={24} />
      </button>
      {isDropdownOpen && (
        <div className="dropdownMenu">
          <div>
            <button onClick={() => handleSortChange("recent")}>최신순</button>
          </div>
          <div>
            <button onClick={() => handleSortChange("favorite")}>
              좋아요순
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;

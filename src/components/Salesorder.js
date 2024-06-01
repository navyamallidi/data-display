import { useEffect, useRef, useState } from "react";
import "../App.css";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";

import Pill from "../components/pill";

function Salesorder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [input, setInput] = useState("");
  const [input1, setInput1] = useState("");
  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tableData, setTableData] = useState([]);

  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setIsError(event.target.value === "");
  };
  



  const handleInputChange1 = (event) => {
    setInput1(event.target.value);
    setIsError(event.target.value === "");
  };

  // https://dummyjson.com/users/search?q=Jo

  useEffect(() => {
    const fetchUsers = () => {
      setActiveSuggestion(0);
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => {
          console.error(err);
        });
    };

    fetchUsers();
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    } else if (e.key === "ArrowDown" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.users.length
    ) {
      handleSelectUser(suggestions.users[activeSuggestion]);
    }
  };

  const handleButtonClick = () => {
    if (inputValue && quantity) {
      const newEntry = {
        product: inputValue,
        quantity: quantity,
      };
      setTableData([...tableData, newEntry]);
      setInputValue('');
      setQuantity('');
    }
  };

  return (
    <div>
      <div class="mt-20 mx-60">
        <Box display="flex" gap="3">
          <div flex="1" class="font-semibold font-sans">
            {" "}
            Enter Products
          </div>
          <div flex="1">
            <div className="user-search-container" class="mb-8">
              <div className="user-search-input">
                {/* Pills */}
                {selectedUsers.map((user) => {
                  return (
                    <Pill
                      key={user.email}
                      image={user.image}
                      text={`${user.firstName} ${user.lastName}`}
                      onClick={() => handleRemoveUser(user)}
                    />
                  );
                })}
                {/* input feild with search suggestions */}
                <div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search For a Product..."
                    onKeyDown={handleKeyDown}
                  />
                  {/* Search Suggestions */}
                  <ul className="suggestions-list">
                    {suggestions?.users?.map((user, index) => {
                      return !selectedUserSet.has(user.email) ? (
                        <li
                          className={index === activeSuggestion ? "active" : ""}
                          key={user.email}
                          onClick={() => handleSelectUser(user)}
                        >
                          <img
                            src={user.image}
                            alt={`${user.firstName} ${user.lastName}`}
                          />
                          <span>
                            {user.firstName} {user.lastName}
                          </span>
                        </li>
                      ) : (
                        <></>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Box>

        <Box display="flex" gap="5" mb="10">
          <FormControl isInvalid={isError} flex="1">
            <FormLabel>Enter Selling Rate</FormLabel>
            <Input type="text" value={input} onChange={handleInputChange} />
          </FormControl>
          <FormControl isInvalid={isError} flex="1">
            <FormLabel>Enter Quantity</FormLabel>
            <Input type="text" value={input1} onChange={handleInputChange1} />
            {!isError ? (
              <FormHelperText>remaining items are </FormHelperText>
            ) : (
              <FormErrorMessage>Enter a Value</FormErrorMessage>
            )}
          </FormControl>
        </Box>


        <Box class="mb-10 font-sans font-bold"> SKU </Box>

        <Box display="flex" gap="5">
          <FormControl isInvalid={isError} flex="1">
            <FormLabel>Selling Rate</FormLabel>
            <Input type="text" value={input} onChange={handleInputChange} />
          </FormControl>
          <FormControl isInvalid={isError} flex="1">
            <FormLabel>Total Quantity</FormLabel>
            <Input type="text" value={input1} onChange={handleInputChange1} />
          </FormControl>
        </Box>

        <div class= "mt-5" >
        <Button onClick={handleButtonClick}>Order Confirmed</Button>
        </div>
        
      </div>
    </div>
  );
}

export default Salesorder;

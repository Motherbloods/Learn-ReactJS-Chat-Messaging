import { useState, useMemo, useRef } from "react";

function useSearchingMessages(messages, currentConversation) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResultCount, setSearchResultCount] = useState(0);
  const [matchedIndexes, setMatchedIndexes] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const messageRefs = useRef([]);

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    const lowerSearch = searchValue.toLowerCase();

    const matches = messages
      .map((message, index) => {
        if (
          message.conversationId === currentConversation &&
          message.text.toLowerCase().includes(lowerSearch)
        ) {
          return index;
        }
        return null;
      })
      .filter((index) => index !== null);

    if (matches.length > 0) {
      setMatchedIndexes(matches);
      setCurrentMatchIndex(0);
      setSearchResultCount(matches.length);
      // messageRefs.current[matches[0]]?.scrollIntoView({ behavior: "smooth", block: "center" });
      scrollToMatch(0);
    } else {
      setMatchedIndexes([]);
      setCurrentMatchIndex(0);
      setSearchResultCount(0);
      alert("Pesan tidak ditemukan.");
    }
  };

  const handleNext = () => {
    if (matchedIndexes.length === 0) return;
    const nextIndex = (currentMatchIndex + 1) % matchedIndexes.length;
    setCurrentMatchIndex(nextIndex);
    // messageRefs.current[matchedIndexes[nextIndex]]?.scrollIntoView({ behavior: "smooth", block: "center" });
    scrollToMatch(matchedIndexes[nextIndex]);
  };

  const handlePrevious = () => {
    if (matchedIndexes.length === 0) return;
    const prevIndex =
      (currentMatchIndex - 1 + matchedIndexes.length) % matchedIndexes.length;
    setCurrentMatchIndex(prevIndex);
    // messageRefs.current[matchedIndexes[prevIndex]]?.scrollIntoView({ behavior: "smooth", block: "center" });
    scrollToMatch(matchedIndexes[prevIndex]);
  };

  const searchResultsLabel = useMemo(() => {
    if (!searchValue || searchResultCount === 0) return "";
    return `Showing result ${currentMatchIndex + 1} of ${searchResultCount}`;
  }, [searchValue, searchResultCount, currentMatchIndex]);

  const scrollToMatch = (index) => {
    messageRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return {
    searchValue,
    setSearchValue,
    handleSearch,
    handleNext,
    handlePrevious,
    searchResultsLabel,
    matchedIndexes,
    messageRefs,
  };
}

export default useSearchingMessages;

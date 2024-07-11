import React from "react";
import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPaginationItems = () => {
    let items = [];

    items.push(
      <Button
        key={1}
        onClick={() => onPageChange(1)}
        isActive={currentPage === 1}
      >
        1
      </Button>,
    );

    if (totalPages <= 7) {
      for (let number = 2; number <= totalPages; number++) {
        items.push(
          <Button
            key={number}
            onClick={() => onPageChange(number)}
            isActive={number === currentPage}
          >
            {number}
          </Button>,
        );
      }
    } else {
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);

      if (currentPage > 4) {
        items.push(
          <Button key="startEllipsis" isDisabled>
            ...
          </Button>,
        );
        startPage += 1;
      }

      if (currentPage <= 4) {
        endPage = 5;
      } else if (currentPage > totalPages - 4) {
        startPage = totalPages - 4;
      }

      for (let number = startPage; number <= endPage; number++) {
        items.push(
          <Button
            key={number}
            onClick={() => onPageChange(number)}
            isActive={number === currentPage}
          >
            {number}
          </Button>,
        );
      }

      if (currentPage < totalPages - 3) {
        items.push(
          <Button key="endEllipsis" isDisabled>
            ...
          </Button>,
        );
      }

      items.push(
        <Button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          isActive={currentPage === totalPages}
        >
          {totalPages}
        </Button>,
      );
    }

    return items;
  };

  const paginationItems = getPaginationItems();
  if (totalPages <= 1) {
    return null;
  }
  return (
    <HStack spacing={2}>
      <IconButton
        aria-label="Previous Page"
        icon={<ChevronLeftIcon />}
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      />
      {paginationItems}
      <IconButton
        aria-label="Next Page"
        icon={<ChevronRightIcon />}
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      />
    </HStack>
  );
};

export default Pagination;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Custom errors for gas efficiency and better error handling
error AlreadyRegistered();
error NotRegistered();
error NotMentor();
error NotMentee();
error ZeroAddress();
error DuplicateSession();
error InvalidRole();
error EmptyName();
error InvalidPagination();

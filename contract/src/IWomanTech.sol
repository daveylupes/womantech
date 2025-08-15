// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./errors/WomanTechErrors.sol";

interface IWomanTech {
    enum Role { Unknown, Mentor, Mentee }

    struct User {
        address account;
        string name;
        Role role;
        uint64 reputation;
        bool registered;
    }

    event UserRegistered(address indexed account, Role role, string name);
    event MentorshipConfirmed(
        address indexed mentor,
        address indexed mentee,
        uint64 newReputation,
        uint256 indexed sessionId
    );

    function register(string calldata name, Role role) external;
    function confirmMentorship(address mentee) external returns (uint256 sessionId);
    function getUser(address account) external view returns (User memory);
    function getUsers(uint256 offset, uint256 limit) external view returns (User[] memory);
    function totalUsers() external view returns (uint256);
}

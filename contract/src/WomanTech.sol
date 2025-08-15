// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IWomanTech.sol";
import "./errors/WomanTechErrors.sol";
import "./libs/AddressArray.sol";

/**
 * @title WomanTech Connect
 * @dev On-chain mentorship platform for women in tech - Built for BlockDAG
 * @dev MVP features: user registration, mentorship confirmation, reputation tracking, and user discovery
 */
contract WomanTech is IWomanTech {
    using AddressArray for address[];

    // Storage
    mapping(address => User) public users;
    address[] private userIndex;
    mapping(bytes32 => bool) private confirmedPair;
    mapping(bytes32 => uint256) private pairCount;

    /**
     * @dev Register a new user as either a mentor or mentee
     * @param name User's display name
     * @param role User's role (Mentor or Mentee)
     */
    function register(string calldata name, Role role) external {
        // Validate inputs
        if (msg.sender == address(0)) revert ZeroAddress();
        if (bytes(name).length == 0) revert EmptyName();
        if (role == Role.Unknown) revert InvalidRole();
        if (users[msg.sender].registered) revert AlreadyRegistered();

        // Create and store user
        users[msg.sender] = User({
            account: msg.sender,
            name: name,
            role: role,
            reputation: 0,
            registered: true
        });

        // Add to user index for discovery
        userIndex.push(msg.sender);

        emit UserRegistered(msg.sender, role, name);
    }

    /**
     * @dev Confirm a mentorship session between a mentor and mentee
     * @param mentee Address of the mentee
     * @return sessionId Unique identifier for this mentorship session
     */
    function confirmMentorship(address mentee) external returns (uint256 sessionId) {
        // Validate caller is registered mentor
        User storage mentor = users[msg.sender];
        if (!mentor.registered) revert NotRegistered();
        if (mentor.role != Role.Mentor) revert NotMentor();

        // Validate mentee is registered
        User storage menteeUser = users[mentee];
        if (!menteeUser.registered) revert NotRegistered();
        if (menteeUser.role != Role.Mentee) revert NotMentee();

        // Generate session key and ID
        bytes32 pairKey = keccak256(abi.encodePacked(msg.sender, mentee));
        sessionId = pairCount[pairKey] + 1;
        bytes32 sessionKey = keccak256(abi.encodePacked(pairKey, sessionId));

        // Check for duplicate session
        if (confirmedPair[sessionKey]) revert DuplicateSession();

        // Mark session as confirmed and increment reputation
        confirmedPair[sessionKey] = true;
        pairCount[pairKey] = sessionId;
        mentor.reputation++;

        emit MentorshipConfirmed(msg.sender, mentee, mentor.reputation, sessionId);
    }

    /**
     * @dev Get user information by address
     * @param account User's address
     * @return User struct with all user data
     */
    function getUser(address account) external view returns (User memory) {
        return users[account];
    }

    /**
     * @dev Get paginated list of users for discovery
     * @param offset Starting index for pagination
     * @param limit Maximum number of users to return
     * @return slice Array of User structs
     */
    function getUsers(uint256 offset, uint256 limit) external view returns (User[] memory slice) {
        address[] memory addressSlice = userIndex.safeSlice(offset, limit);
        slice = new User[](addressSlice.length);
        
        for (uint256 i = 0; i < addressSlice.length; i++) {
            slice[i] = users[addressSlice[i]];
        }
    }

    /**
     * @dev Get total number of registered users
     * @return Total count of registered users
     */
    function totalUsers() external view returns (uint256) {
        return userIndex.length;
    }
}

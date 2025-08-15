// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/WomanTech.sol";
import "../src/IWomanTech.sol";
import "../src/errors/WomanTechErrors.sol";

contract WomanTechTest is Test {
    WomanTech public womanTech;
    
    address public mentor = address(0x1);
    address public mentee = address(0x2);
    address public anotherMentor = address(0x3);
    address public anotherMentee = address(0x4);

    event UserRegistered(address indexed account, WomanTech.Role role, string name);
    event MentorshipConfirmed(
        address indexed mentor,
        address indexed mentee,
        uint64 newReputation,
        uint256 indexed sessionId
    );

    function setUp() public {
        womanTech = new WomanTech();
    }

    function testRegisterMentorAndMentee_Succeeds() public {
        vm.startPrank(mentor);
        vm.expectEmit(true, false, false, true);
        emit UserRegistered(mentor, IWomanTech.Role.Mentor, "Alice");
        womanTech.register("Alice", IWomanTech.Role.Mentor);
        vm.stopPrank();

        vm.startPrank(mentee);
        vm.expectEmit(true, false, false, true);
        emit UserRegistered(mentee, IWomanTech.Role.Mentee, "Bob");
        womanTech.register("Bob", IWomanTech.Role.Mentee);
        vm.stopPrank();

        // Verify user data
        WomanTech.User memory mentorUser = womanTech.getUser(mentor);
        assertEq(mentorUser.account, mentor);
        assertEq(mentorUser.name, "Alice");
        assertEq(uint8(mentorUser.role), uint8(IWomanTech.Role.Mentor));
        assertEq(mentorUser.reputation, 0);
        assertTrue(mentorUser.registered);

        WomanTech.User memory menteeUser = womanTech.getUser(mentee);
        assertEq(menteeUser.account, mentee);
        assertEq(menteeUser.name, "Bob");
        assertEq(uint8(menteeUser.role), uint8(IWomanTech.Role.Mentee));
        assertEq(menteeUser.reputation, 0);
        assertTrue(menteeUser.registered);

        // Verify total users
        assertEq(womanTech.totalUsers(), 2);
    }

    function testCannotDoubleRegister() public {
        vm.startPrank(mentor);
        womanTech.register("Alice", IWomanTech.Role.Mentor);
        
        vm.expectRevert(AlreadyRegistered.selector);
        womanTech.register("Alice2", IWomanTech.Role.Mentor);
        vm.stopPrank();
    }

    function testConfirmMentorship_IncrementsReputationAndEmitsEvent() public {
        // Register users
        vm.prank(mentor);
        womanTech.register("Alice", IWomanTech.Role.Mentor);
        
        vm.prank(mentee);
        womanTech.register("Bob", IWomanTech.Role.Mentee);

        // Confirm mentorship
        vm.prank(mentor);
        vm.expectEmit(true, true, true, true);
        emit MentorshipConfirmed(mentor, mentee, 1, 1);
        uint256 sessionId = womanTech.confirmMentorship(mentee);
        assertEq(sessionId, 1);

        // Verify reputation increment
        WomanTech.User memory mentorUser = womanTech.getUser(mentor);
        assertEq(mentorUser.reputation, 1);
    }

    function testConfirmMentorship_RevertsIfCallerNotMentor() public {
        // Register mentee as mentor (wrong role)
        vm.prank(mentor);
        womanTech.register("Alice", IWomanTech.Role.Mentee);
        
        vm.prank(mentee);
        womanTech.register("Bob", IWomanTech.Role.Mentee);

        // Try to confirm mentorship from non-mentor
        vm.prank(mentor);
        vm.expectRevert(NotMentor.selector);
        womanTech.confirmMentorship(mentee);
    }

    function testConfirmMentorship_RevertsIfMenteeNotRegistered() public {
        // Register only mentor
        vm.prank(mentor);
        womanTech.register("Alice", IWomanTech.Role.Mentor);

        // Try to confirm mentorship with unregistered mentee
        vm.prank(mentor);
        vm.expectRevert(NotRegistered.selector);
        womanTech.confirmMentorship(mentee);
    }

    function testConfirmMentorship_SessionIdsMonotonicPerPairAndNoDuplicateInSameCall() public {
        // Register users
        vm.prank(mentor);
        womanTech.register("Alice", IWomanTech.Role.Mentor);
        
        vm.prank(mentee);
        womanTech.register("Bob", IWomanTech.Role.Mentee);

        // Confirm multiple sessions
        vm.prank(mentor);
        uint256 sessionId1 = womanTech.confirmMentorship(mentee);
        assertEq(sessionId1, 1);

        vm.prank(mentor);
        uint256 sessionId2 = womanTech.confirmMentorship(mentee);
        assertEq(sessionId2, 2);

        vm.prank(mentor);
        uint256 sessionId3 = womanTech.confirmMentorship(mentee);
        assertEq(sessionId3, 3);

        // Verify reputation increments
        WomanTech.User memory mentorUser = womanTech.getUser(mentor);
        assertEq(mentorUser.reputation, 3);
    }

    function testPagination_ReturnsStableSlices() public {
        // Register multiple users
        address[] memory testUsers = new address[](5);
        testUsers[0] = address(0x10);
        testUsers[1] = address(0x11);
        testUsers[2] = address(0x12);
        testUsers[3] = address(0x13);
        testUsers[4] = address(0x14);

        for (uint256 i = 0; i < testUsers.length; i++) {
            vm.prank(testUsers[i]);
            womanTech.register(string(abi.encodePacked("User", vm.toString(i))), IWomanTech.Role.Mentor);
        }

        // Test pagination
        WomanTech.User[] memory slice1 = womanTech.getUsers(0, 2);
        assertEq(slice1.length, 2);
        assertEq(slice1[0].account, testUsers[0]);
        assertEq(slice1[1].account, testUsers[1]);

        WomanTech.User[] memory slice2 = womanTech.getUsers(2, 2);
        assertEq(slice2.length, 2);
        assertEq(slice2[0].account, testUsers[2]);
        assertEq(slice2[1].account, testUsers[3]);

        WomanTech.User[] memory slice3 = womanTech.getUsers(4, 2);
        assertEq(slice3.length, 1);
        assertEq(slice3[0].account, testUsers[4]);

        // Test out of bounds
        WomanTech.User[] memory slice4 = womanTech.getUsers(10, 2);
        assertEq(slice4.length, 0);
    }

    function testRegister_RevertsOnZeroAddress() public {
        vm.prank(address(0));
        vm.expectRevert(ZeroAddress.selector);
        womanTech.register("Alice", IWomanTech.Role.Mentor);
    }

    function testRegister_RevertsOnEmptyName() public {
        vm.prank(mentor);
        vm.expectRevert(EmptyName.selector);
        womanTech.register("", IWomanTech.Role.Mentor);
    }

    function testRegister_RevertsOnInvalidRole() public {
        vm.prank(mentor);
        vm.expectRevert(InvalidRole.selector);
        womanTech.register("Alice", IWomanTech.Role.Unknown);
    }

    function testConfirmMentorship_RevertsIfMenteeIsNotMentee() public {
        // Register both as mentors
        vm.prank(mentor);
        womanTech.register("Alice", IWomanTech.Role.Mentor);
        
        vm.prank(mentee);
        womanTech.register("Bob", IWomanTech.Role.Mentor);

        // Try to confirm mentorship
        vm.prank(mentor);
        vm.expectRevert(NotMentee.selector);
        womanTech.confirmMentorship(mentee);
    }

    // Fuzz tests
    function testFuzz_RegisterWithValidName(string calldata name) public {
        vm.assume(bytes(name).length > 0 && bytes(name).length <= 50);
        
        vm.prank(mentor);
        womanTech.register(name, IWomanTech.Role.Mentor);
        
        WomanTech.User memory user = womanTech.getUser(mentor);
        assertEq(user.name, name);
    }

    function testFuzz_PaginationWithValidBounds(uint256 offset, uint256 limit) public {
        vm.assume(limit <= 100); // Reasonable limit for testing
        vm.assume(offset <= 1000); // Reasonable offset for testing
        
        // Register some users
        for (uint256 i = 0; i < 10; i++) {
            vm.prank(address(uint160(i + 100)));
            womanTech.register(string(abi.encodePacked("User", vm.toString(i))), IWomanTech.Role.Mentor);
        }

        WomanTech.User[] memory slice = womanTech.getUsers(offset, limit);
        
        // Verify slice is not larger than requested
        assertLe(slice.length, limit);
        
        // Verify slice doesn't exceed total users (only if offset is reasonable)
        if (offset <= womanTech.totalUsers()) {
            assertLe(slice.length + offset, womanTech.totalUsers());
        }
    }

    function testFuzz_MultipleMentorshipSessions(uint256 sessionCount) public {
        vm.assume(sessionCount > 0 && sessionCount <= 10); // Reasonable bounds
        
        // Register users
        vm.prank(mentor);
        womanTech.register("Alice", IWomanTech.Role.Mentor);
        
        vm.prank(mentee);
        womanTech.register("Bob", IWomanTech.Role.Mentee);

        // Confirm multiple sessions
        for (uint256 i = 0; i < sessionCount; i++) {
            vm.prank(mentor);
            uint256 sessionId = womanTech.confirmMentorship(mentee);
            assertEq(sessionId, i + 1);
        }

        // Verify final reputation
        WomanTech.User memory mentorUser = womanTech.getUser(mentor);
        assertEq(mentorUser.reputation, sessionCount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../errors/WomanTechErrors.sol";

library AddressArray {
    /**
     * @dev Safely slices an array of addresses for pagination
     * @param array The array to slice
     * @param offset Starting index
     * @param limit Maximum number of elements to return
     * @return slice The sliced array
     */
    function safeSlice(
        address[] storage array,
        uint256 offset,
        uint256 limit
    ) internal view returns (address[] memory slice) {
        uint256 arrayLength = array.length;
        
        // Validate pagination parameters
        if (offset >= arrayLength) {
            return new address[](0);
        }
        
        // Calculate the actual slice size
        uint256 endIndex = offset + limit;
        if (endIndex > arrayLength) {
            endIndex = arrayLength;
        }
        
        uint256 sliceSize = endIndex - offset;
        slice = new address[](sliceSize);
        
        // Copy elements to the slice
        for (uint256 i = 0; i < sliceSize; i++) {
            slice[i] = array[offset + i];
        }
    }
}

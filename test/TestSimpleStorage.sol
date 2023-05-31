// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";

contract TestSimpleStorage {

    function testItStoresAValue() public {
        SimpleStorage simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());

        simpleStorage.set(89);

        uint256 expected = 89;

        uint256 storedData = simpleStorage.get();

        Assert.equal(storedData, expected, "It should store the value 89.");
    }
}
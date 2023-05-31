// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

contract SimpleStorage {
    struct CrimeDetails {
        uint256 crime_id;
        string timestamp;
        string offense_code;
        string description;
    }

    CrimeDetails[] public crime;

    function addCrimeReport(
        uint256 _crime_id,
        string memory _timestamp,
        string memory _offense_code,
        string memory _description
    ) public returns (uint256) {
        crime.push(
            CrimeDetails({
                crime_id: _crime_id,
                timestamp: _timestamp,
                offense_code: _offense_code,
                description: _description
            })
        );
        return crime.length;
    }

    function getCrimeCount() public view returns (uint256) {
        return crime.length;
    }

    function getCrimeBlock(
        uint256 index
    )
        public
        view
        returns (uint256, string memory, string memory, string memory)
    {
        require(index < crime.length, "Index out of range");
        CrimeDetails storage tempCrime = crime[index];
        return (
            tempCrime.crime_id,
            tempCrime.timestamp,
            tempCrime.offense_code,
            tempCrime.description
        );
    }

    function getAllCrimeDetails() public view returns (CrimeDetails[] memory) {
        return crime;
    }

    function getCrimeById(uint256 _crime_id)
        public
        view
        returns (uint256, string memory, string memory, string memory)
    {
        for (uint256 i = 0; i < crime.length; i++) {
            if (crime[i].crime_id == _crime_id) {
                return (
                    crime[i].crime_id,
                    crime[i].timestamp,
                    crime[i].offense_code,
                    crime[i].description
                );
            }
        }
        revert("Crime not found");
    }
}

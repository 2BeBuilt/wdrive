// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import { IERC20 } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { StringToAddress, AddressToString } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/utils/AddressString.sol';
import './CrossChainNFT.sol';
import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';

contract Factory is AxelarExecutable, ERC721Holder {
    using StringToAddress for string;
    using AddressToString for address;

    // struct Log {
    //     mapping(string => address) first
    //     address
    // }

    CrossChainNFT public deployment;
    CrossChainNFT[] public deployments;

    string public chainName;

    constructor(address gateway_, address gasReceiver_, string chainName_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasReceiver_);
        chainName = chainName_;
    }

    //send this contract NFT first, then call bridgeOut with specifics
    function bridgeOut(address nftContract, uint256 tokenId, string memory destinationChain) external payable {
        require(CrossChainNFT(nftContract).ownerOf(tokenId) == address(this), 'TokenId is not in the bridge balance');

        string memory tokenURI = CrossChainNFT(nftContract).tokenURI(tokenId);
        string memory name = CrossChainNFT(nftContract).name();
        string memory symbol = CrossChainNFT(nftContract).symbol();

        //Create the payload.
        bytes memory payload = abi.encode(chainName, msg.sender, tokenId, nftContract, tokenURI, symbol, name);
        string memory stringAddress = address(this).toString();
        //Pay for gas. We could also send the contract call here but then the sourceAddress will be that of the gas receiver which is a problem later.
        gasService.payNativeGasForContractCall{ value: msg.value }(address(this), destinationChain, stringAddress, payload, msg.sender);
        //Call remote contract.
        gateway.callContract(destinationChain, stringAddress, payload);

        string memory tokenURI = CrossChainNFT(nftContract).tokenURI(tokenId);
        string memory name = CrossChainNFT(nftContract).name();
        string memory symbol = CrossChainNFT(nftContract).symbol();

        //Create the payload.
        bytes memory payload = abi.encode(chainName, msg.sender, tokenId, nftContract, tokenURI, symbol, name);
        string memory stringAddress = address(this).toString();
        //Pay for gas. We could also send the contract call here but then the sourceAddress will be that of the gas receiver which is a problem later.
        gasService.payNativeGasForContractCall{ value: msg.value }(address(this), destinationChain, stringAddress, payload, msg.sender);
        //Call remote contract.
        gateway.callContract(destinationChain, stringAddress, payload);
    }

    //This is automatically executed by Axelar Microservices since gas was payed for.
    function _execute(string calldata /*sourceChain*/, string calldata sourceAddress, bytes calldata payload) internal override {
        //Check that the sender is another token linker.
        require(sourceAddress.toAddress() == address(this), 'not in a network');
        //Decode the payload.
        (
            string memory fromChain,
            address recipient,
            uint256 tokenId,
            address nftContract,
            string memory tokenURI,
            string memory symbol,
            string memory name
        ) = abi.decode(payload, (string, address, uint256, address, string, string, string));

        // //if original contract is not in the mapping (never bridged before)
        // if (originalToBridged[nftContract] == address(0)) {}

        //If this contract has the token (original or wrapped, then release it)
        if (CrossChainNFT(nftContract).ownerOf(tokenId) == address(this)) {
            CrossChainNFT(nftContract).transferFrom(address(this), recipient, tokenId);
            //Otherwise we need to mint a new one.
        } else {
            deployment = new CrossChainNFT(name, symbol);
            deployment.mint(recipient, tokenId, tokenURI); //minted the right token ID, NAME, SYMBOL, RECIPIENT
            deployment.setTokenURI(tokenId, tokenURI); //set the right tokenURI
            deployments.push(deployment);
        }
    }
}
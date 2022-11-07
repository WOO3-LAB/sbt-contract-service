// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @dev A soulbound token is a token that is bound to another Non-Fungible Token (NFT; e.g., a EIP-721 token) 
 * when it is minted, and cannot be transferred/moved after that.
 */
contract WooTemplate is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    struct Token {
        address addr;
        uint256 tokenId;
    }
    // Token ID
    Counters.Counter private _tokenIdCounter;


    event TokenMinted(address minter, uint256 tokenId);
    event TokenChanged(uint256 tokenId);

    mapping(string => address) public TokenMintMap;
    mapping(string => Token) public TokenUpdateMap;


    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor() ERC721("WooTemplate", "SBT") {

    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`,tokenId will increase.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     *
     * Emits a {TokenMinted} event.
     */
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit TokenMinted(to, tokenId);
    }

    /**
     * @dev Update `uri` as the the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {TokenMinted} event.
     */
    function update(uint256 tokenId, string memory uri) public onlyOwner {
        require(_exists(tokenId), "Woo3SBT: URI set of nonexistent token");
        _setTokenURI(tokenId, uri);        
        emit TokenChanged(tokenId);
    }

    /**
     * @dev set mint map, so user can mint by himself.
     *
     * Requirements:
     *
     * - `addresses` and `uris`  must match the length.
     *
     * Emits a {TokenMinted} event.
     */
    function setTokenMintMap(address[] calldata addresses,string[] calldata uris) public onlyOwner {
        require(addresses.length==uris.length,"Woo3SBT: addresses and uris  must match the length.");
        for (uint i = 0; i < addresses.length; i++) {
            TokenMintMap[uris[i]] = addresses[i];
        }
    }

    /**
     * @dev delete mint map.
     *
     * Requirements:
     *
     * - `uri` and `address` must exist.
     *
     * Emits a {TokenMinted} event.
     */
    function deleteTokenMint(address owner,string memory uri) public onlyOwner{
        require(_existUri(owner,uri),"Woo3SBT: URI set of nonexistent owner");
        delete TokenMintMap[uri];
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `msg.sender`,tokenId will increase.
     *
     * Requirements:
     *
     * - `uri` and `address` must exist in `TokenMintMap`.
     *
     * Emits a {TokenMinted} event.
     */
    function safeMintByUser(string memory uri) public {
        require(_existUri(msg.sender,uri),"Woo3SBT: URI set of nonexistent user");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        delete TokenMintMap[uri];
        emit TokenMinted(msg.sender, tokenId);
    }


    /**
     * @dev set update map, so user can update by himself.
     *
     * Requirements:
     *
     * - `addresses` 、`uris` and `tokenIds`  must match the length.
     *
     * Emits a {TokenMinted} event.
     */
    function setTokenUpdateMap(address[] calldata addresses,string[] calldata uris,uint256[] calldata tokenIds) public onlyOwner {
        require(addresses.length==uris.length&&uris.length==tokenIds.length,"Woo3SBT: addresses uris and tokenIds  must match the length");
        for (uint i = 0; i < addresses.length; i++) {
            Token storage t=TokenUpdateMap[uris[i]];
            t.tokenId=tokenIds[i];
            t.addr=addresses[i];
        }
    }

    /**
     * @dev delete update map.
     *
     * Requirements:
     *
     * - `uri` 、`address` and `tokenId` must exist.
     *
     * Emits a {TokenMinted} event.
     */
    function deleteTokenUpdate(address owner,string memory uri,uint256 tokenId) public onlyOwner{
        require(_existToken(owner,uri,tokenId),"Woo3SBT: URI set of nonexistent owner");
        delete TokenUpdateMap[uri];
    }

    /**
     * @dev Update `uri` as the the tokenURI of `tokenId` by user.
     *
     * Requirements:
     *
     * - `uri` 、`address` and `tokenId` must exist in `TokenMintMap`.
     *
     * Emits a {TokenChanged} event.
     */
    function updateByUser(string memory uri,uint256 tokenId) public {
        require(_existToken(msg.sender,uri,tokenId),"Woo3SBT: URI set of nonexistent user");
        _setTokenURI(tokenId, uri);        
        emit TokenChanged(tokenId);
    }
    

    /**
     * @dev Returns whether `uri` exists in TokenMintMap.
     *
     */
    function _existUri(address owner,string memory uri) internal view virtual returns (bool) {
        return TokenMintMap[uri]!=address(0)&&TokenMintMap[uri] == owner;
    }

    /**
     * @dev Returns whether `tokenId` exists and `uri` exists in TokenUpdateMap.
     *
     */
    function _existToken(address owner,string memory uri,uint256 tokenId) internal view virtual returns (bool) {
        return TokenUpdateMap[uri].addr!=address(0)&&TokenUpdateMap[uri].addr == owner&&_exists(tokenId)&&TokenUpdateMap[uri].tokenId==tokenId;
    }

    /**
     * @dev withdraw balance.
     * msg.sender is payable for gas.
     */
    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     */
    function burn(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "Woo3SBT: URI set of nonexistent token");
        _burn(tokenId);
    }

    /**
     * @dev See {ERC721-_burn}.
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    /**
     * @dev See {ERC721-tokenURI}.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev override {ERC721-approve}.Disable {approve}
     */
    function approve(address, uint256) public pure override(ERC721) {
        require(false, "Woo3SBT: Cannot approve.");
    }

    /**
     * @dev override {ERC721-setApprovalForAll}.Disable {setApprovalForAll}
     */
    function setApprovalForAll(address, bool) public pure override(ERC721) {
        require(false, "Woo3SBT: Cannot setApprovalForAll.");
    }

    /**
     * @dev See {ERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public view override(ERC721) onlyOwner {
        safeTransferFrom(from, to, tokenId, bytes(""));
    }

    /**
     * @dev See {ERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public view override(ERC721) onlyOwner {
        _transferToken(from, to, tokenId, _data);
    }

    /**
     * @dev See {ERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public view override(ERC721) onlyOwner {
        _transferToken(from, to, tokenId, bytes(""));
    }

    /**
     * @dev Sbt disable transfer
     */
    function _transferToken(
        address,
        address,
        uint256,
        bytes memory
    ) private pure {
        require(
            false,
            "Woo3SBT: Cannot transfer."
        );
    }
}
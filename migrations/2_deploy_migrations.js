const PreAllocation = artifacts.require("PreAllocation");

module.exports = function (deployer) {
  const totalSupply = 1000; // Define el total supply inicial aquí
  deployer.deploy(PreAllocation, totalSupply);
};
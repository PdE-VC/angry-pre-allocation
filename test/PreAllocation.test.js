const PreAllocation = artifacts.require("PreAllocation");

contract("PreAllocation", (accounts) => {
  let instance;
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  before(async () => {
    instance = await PreAllocation.new(1000, { from: owner }); // Total supply: 1000 tokens
  });

  describe("Deployment", () => {
    it("should set the correct owner", async () => {
      const contractOwner = await instance.owner();
      assert.equal(contractOwner, owner, "Owner is not set correctly");
    });

    it("should initialize total supply correctly", async () => {
      const totalSupply = await instance.totalSupply();
      assert.equal(totalSupply.toString(), "1000", "Total supply is not set correctly");
    });

    it("should initialize total assigned to 0", async () => {
      const totalAssigned = await instance.totalAssigned();
      assert.equal(totalAssigned.toString(), "0", "Total assigned is not initialized to 0");
    });
  });

  describe("addTokens function", () => {
    it("should assign tokens to an address", async () => {
      await instance.addTokens(user1, 200, { from: owner });
      const balance = await instance.getBalance(user1);
      assert.equal(balance.toString(), "200", "Tokens not assigned correctly");
    });

    it("should update total assigned tokens", async () => {
      const totalAssigned = await instance.totalAssigned();
      assert.equal(totalAssigned.toString(), "200", "Total assigned not updated correctly");
    });

    it("should not exceed total supply", async () => {
      try {
        await instance.addTokens(user1, 1000, { from: owner });
        assert.fail("Should not allow exceeding total supply");
      } catch (error) {
        assert.include(error.message, "Cannot exceed total supply", "Error message mismatch");
      }
    });

    it("should not allow non-owners to assign tokens", async () => {
      try {
        await instance.addTokens(user2, 100, { from: user1 });
        assert.fail("Non-owner was able to assign tokens");
      } catch (error) {
        assert.include(error.message, "Only the owner", "Error message mismatch");
      }
    });
  });

  describe("getBalance function", () => {
    it("should return the correct balance for an address", async () => {
      const balance = await instance.getBalance(user1);
      assert.equal(balance.toString(), "200", "Balance is not correct");
    });

    it("should return 0 for an address with no tokens", async () => {
      const balance = await instance.getBalance(user2);
      assert.equal(balance.toString(), "0", "Balance for new address should be 0");
    });
  });

  describe("Input validations", () => {
    it("should not allow assigning tokens to the zero address", async () => {
      try {
        await instance.addTokens("0x0000000000000000000000000000000000000000", 100, { from: owner });
        assert.fail("Should not allow assigning tokens to zero address");
      } catch (error) {
        assert.include(error.message, "Invalid address", "Error message mismatch");
      }
    });

    it("should not allow assigning 0 tokens", async () => {
      try {
        await instance.addTokens(user1, 0, { from: owner });
        assert.fail("Should not allow assigning 0 tokens");
      } catch (error) {
        assert.include(error.message, "Amount must be greater than 0", "Error message mismatch");
      }
    });
  });  
});
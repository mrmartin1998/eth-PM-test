// SPDX-License-Identifier: MIT
const GameShop= artifacts.require("GameShop");

module.exports = function (deployer) {
  deployer.deploy(GameShop);
};
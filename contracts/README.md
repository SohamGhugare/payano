# contracts

## How CollateralLock.ak is used in Payano

The `CollateralLock.ak` smart contract is central to Payano's core functionality. It enables users to lock their ADA as collateral when taking out a loan to shop online. The contract enforces the following logic:

- **Locking Collateral:** When a user borrows against their ADA, the contract locks the specified amount of ADA as collateral on-chain.
- **Repayment:** The contract allows the owner (borrower) to repay the loan (plus interest) before a deadline. Upon successful repayment, the collateral is released back to the owner.
- **Liquidation:** If the deadline passes without repayment, the lender can liquidate the collateral, claiming the locked ADA.

This mechanism ensures trustless, automated enforcement of loan terms, protecting both the borrower and the lender without requiring a centralized intermediary.


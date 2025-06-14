use cardano/address.{Credential}
use cardano/assets.{PolicyId}
use cardano/transaction.{Transaction, OutputReference}
use cardano/governance.{ProposalProcedure, Voter}
use cardano/certificate.{Certificate}

// Custom types
pub type Datum = {
  owner: Credential,
  deadline: Int,
  loan_amount: Int,
  interest: Int,
  lender: Credential
}

pub enum Redeemer {
  Repay,
  Liquidate
}

validator collateral {
  // Handler for spending locked collateral (spend purpose)
  spend(datum_opt: Option<Datum>, redeemer: Redeemer, utxo: OutputReference, tx: Transaction) {
    expect Some(datum) = datum_opt

    let is_owner = tx.signatories.contains(datum.owner)
    let now = tx.validity.valid_from      // pseudo-field
    let after_deadline = now >= datum.deadline

    match redeemer {
      Repay =>
        // Owner repays before deadline, including interest
        expect is_owner
        expect now < datum.deadline
        expect tx.outputs.any(o => 
          o.address == datum.owner &&
          o.value >= datum.loan_amount + datum.interest
        )

      Liquidate =>
        // After deadline, lender can liquidate collateral
        expect after_deadline
        expect tx.signatories.contains(datum.lender)
    }
  }

  // Optional fallback
  else(ctx: ScriptContext) {
    fail @"Unsupported operation"
  }
}

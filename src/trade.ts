import { BigInt } from "@graphprotocol/graph-ts"
import {
  Trade,
  Deposit,
  FundingUpdated,
  OrderCancelled,
  OrderCreated,
  PositionDecreased,
  PositionIncreased,
  PositionLiquidated,
  Withdraw
} from "../generated/Trade/Trade"
import { ExampleEntity } from "../generated/schema"

export function handleDeposit(event: Deposit): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.user = event.params.user
  entity.amount = event.params.amount

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.BPS_DIVIDER(...)
  // - contract.UNIT(...)
  // - contract.chainlink(...)
  // - contract.getAccruedFunding(...)
  // - contract.getExecutableOrderIds(...)
  // - contract.getLiquidatableUsers(...)
  // - contract.getMarketsWithPrices(...)
  // - contract.getUpl(...)
  // - contract.getUserPositionsWithUpls(...)
  // - contract.gov(...)
  // - contract.pool(...)
  // - contract.store(...)
}

export function handleFundingUpdated(event: FundingUpdated): void {}

export function handleOrderCancelled(event: OrderCancelled): void {}

export function handleOrderCreated(event: OrderCreated): void {}

export function handlePositionDecreased(event: PositionDecreased): void {}

export function handlePositionIncreased(event: PositionIncreased): void {}

export function handlePositionLiquidated(event: PositionLiquidated): void {}

export function handleWithdraw(event: Withdraw): void {}

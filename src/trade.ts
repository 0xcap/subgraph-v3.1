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
import { Order } from "../generated/schema"


/*export function handleDeposit(event: Deposit): void {
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
}*/

let liqId = 0

export function handleFundingUpdated(event: FundingUpdated): void {}


export function handleOrderCancelled(event: OrderCancelled): void {

  let order = Order.load(event.params.orderId.toString())

  if (order) {
    if (order.status != "active") return
    order.status = "cancelled"
    order.timestamp = event.block.timestamp.toI32()
    order.save()
  }

}

export function handleOrderCreated(event: OrderCreated): void {

  let order = Order.load(event.params.orderId.toString())

  if (order == null) {

    order = new Order(event.params.orderId.toString())
    order.orderId = event.params.orderId
    order.txHash = event.transaction.hash.toHexString()
    order.orderType = event.params.orderType
    order.user = event.params.user
    order.market = event.params.market
    order.isLong = event.params.isLong
    order.size = event.params.size
    order.margin = event.params.margin

    order.price = event.params.price
    order.fee = event.params.fee // total fees paid can be tracked here

    order.status = "active"
    order.isReduceOnly = event.params.isReduceOnly

    order.timestamp = event.block.timestamp.toI32()
    order.blockNumber = event.block.number

    order.save()

  }

}

export function handlePositionDecreased(event: PositionDecreased): void {


    // Update order state
    let order = Order.load(event.params.orderId.toString())
    if (order == null) {
      return
    }

    order.status = "executed"
    order.timestamp = event.block.timestamp.toI32()
    order.margin = event.params.margin
    order.price = event.params.price
    order.fee = event.params.fee
    order.pnl = event.params.pnl
    order.save()

}

export function handlePositionIncreased(event: PositionIncreased): void {

    let order = Order.load(event.params.orderId.toString())

    if (order == null) {
      return
    }

    order.status = "executed"
    order.timestamp = event.block.timestamp.toI32()
    order.margin = event.params.margin
    order.price = event.params.price
    order.fee = event.params.fee
    order.save()

}

export function handlePositionLiquidated(event: PositionLiquidated): void {

  liqId++

  let liqString = `${liqId}.liq`

  let liqOrder = new Order(liqString)

  liqOrder.orderId = BigInt.fromI32(liqId)
  liqOrder.txHash = event.transaction.hash.toHexString()
  liqOrder.user = event.params.user
  liqOrder.market = event.params.market
  liqOrder.price = event.params.price
  liqOrder.isLong = event.params.isLong
  liqOrder.size = event.params.size
  liqOrder.margin = event.params.margin
  liqOrder.pnl = BigInt.fromI32(-1).times(event.params.margin)
  liqOrder.status = "liquidated"
  liqOrder.fee = event.params.fee
  liqOrder.liquidatorFee = event.params.liquidatorFee
  liqOrder.orderType = 0
  liqOrder.timestamp = event.block.timestamp.toI32()
  liqOrder.blockNumber = event.block.number
  liqOrder.isReduceOnly = false

  liqOrder.save()

}

export function handleWithdraw(event: Withdraw): void {}

import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Deposit,
  FundingUpdated,
  OrderCancelled,
  OrderCreated,
  PositionDecreased,
  PositionIncreased,
  PositionLiquidated,
  Withdraw
} from "../generated/Trade/Trade"

export function createDepositEvent(user: Address, amount: BigInt): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return depositEvent
}

export function createFundingUpdatedEvent(
  market: string,
  fundingTracker: BigInt,
  fundingIncrement: BigInt
): FundingUpdated {
  let fundingUpdatedEvent = changetype<FundingUpdated>(newMockEvent())

  fundingUpdatedEvent.parameters = new Array()

  fundingUpdatedEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromString(market))
  )
  fundingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "fundingTracker",
      ethereum.Value.fromSignedBigInt(fundingTracker)
    )
  )
  fundingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "fundingIncrement",
      ethereum.Value.fromSignedBigInt(fundingIncrement)
    )
  )

  return fundingUpdatedEvent
}

export function createOrderCancelledEvent(
  orderId: BigInt,
  user: Address
): OrderCancelled {
  let orderCancelledEvent = changetype<OrderCancelled>(newMockEvent())

  orderCancelledEvent.parameters = new Array()

  orderCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  )
  orderCancelledEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return orderCancelledEvent
}

export function createOrderCreatedEvent(
  orderId: BigInt,
  user: Address,
  market: string,
  isLong: boolean,
  margin: BigInt,
  size: BigInt,
  price: BigInt,
  fee: BigInt,
  orderType: i32,
  isReduceOnly: boolean
): OrderCreated {
  let orderCreatedEvent = changetype<OrderCreated>(newMockEvent())

  orderCreatedEvent.parameters = new Array()

  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromString(market))
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("isLong", ethereum.Value.fromBoolean(isLong))
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("margin", ethereum.Value.fromUnsignedBigInt(margin))
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("size", ethereum.Value.fromUnsignedBigInt(size))
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "orderType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(orderType))
    )
  )
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "isReduceOnly",
      ethereum.Value.fromBoolean(isReduceOnly)
    )
  )

  return orderCreatedEvent
}

export function createPositionDecreasedEvent(
  orderId: BigInt,
  user: Address,
  market: string,
  isLong: boolean,
  size: BigInt,
  margin: BigInt,
  price: BigInt,
  positionMargin: BigInt,
  positionSize: BigInt,
  positionPrice: BigInt,
  fundingTracker: BigInt,
  fee: BigInt,
  keeperFee: BigInt,
  pnl: BigInt,
  fundingFee: BigInt
): PositionDecreased {
  let positionDecreasedEvent = changetype<PositionDecreased>(newMockEvent())

  positionDecreasedEvent.parameters = new Array()

  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromString(market))
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam("isLong", ethereum.Value.fromBoolean(isLong))
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam("size", ethereum.Value.fromUnsignedBigInt(size))
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam("margin", ethereum.Value.fromUnsignedBigInt(margin))
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam(
      "positionMargin",
      ethereum.Value.fromUnsignedBigInt(positionMargin)
    )
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam(
      "positionSize",
      ethereum.Value.fromUnsignedBigInt(positionSize)
    )
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam(
      "positionPrice",
      ethereum.Value.fromUnsignedBigInt(positionPrice)
    )
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam(
      "fundingTracker",
      ethereum.Value.fromSignedBigInt(fundingTracker)
    )
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam(
      "keeperFee",
      ethereum.Value.fromUnsignedBigInt(keeperFee)
    )
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam("pnl", ethereum.Value.fromSignedBigInt(pnl))
  )
  positionDecreasedEvent.parameters.push(
    new ethereum.EventParam(
      "fundingFee",
      ethereum.Value.fromSignedBigInt(fundingFee)
    )
  )

  return positionDecreasedEvent
}

export function createPositionIncreasedEvent(
  orderId: BigInt,
  user: Address,
  market: string,
  isLong: boolean,
  size: BigInt,
  margin: BigInt,
  price: BigInt,
  positionMargin: BigInt,
  positionSize: BigInt,
  positionPrice: BigInt,
  fundingTracker: BigInt,
  fee: BigInt,
  keeperFee: BigInt
): PositionIncreased {
  let positionIncreasedEvent = changetype<PositionIncreased>(newMockEvent())

  positionIncreasedEvent.parameters = new Array()

  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromString(market))
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam("isLong", ethereum.Value.fromBoolean(isLong))
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam("size", ethereum.Value.fromUnsignedBigInt(size))
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam("margin", ethereum.Value.fromUnsignedBigInt(margin))
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam(
      "positionMargin",
      ethereum.Value.fromUnsignedBigInt(positionMargin)
    )
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam(
      "positionSize",
      ethereum.Value.fromUnsignedBigInt(positionSize)
    )
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam(
      "positionPrice",
      ethereum.Value.fromUnsignedBigInt(positionPrice)
    )
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam(
      "fundingTracker",
      ethereum.Value.fromSignedBigInt(fundingTracker)
    )
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  positionIncreasedEvent.parameters.push(
    new ethereum.EventParam(
      "keeperFee",
      ethereum.Value.fromUnsignedBigInt(keeperFee)
    )
  )

  return positionIncreasedEvent
}

export function createPositionLiquidatedEvent(
  user: Address,
  market: string,
  isLong: boolean,
  size: BigInt,
  margin: BigInt,
  price: BigInt,
  fee: BigInt,
  liquidatorFee: BigInt
): PositionLiquidated {
  let positionLiquidatedEvent = changetype<PositionLiquidated>(newMockEvent())

  positionLiquidatedEvent.parameters = new Array()

  positionLiquidatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  positionLiquidatedEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromString(market))
  )
  positionLiquidatedEvent.parameters.push(
    new ethereum.EventParam("isLong", ethereum.Value.fromBoolean(isLong))
  )
  positionLiquidatedEvent.parameters.push(
    new ethereum.EventParam("size", ethereum.Value.fromUnsignedBigInt(size))
  )
  positionLiquidatedEvent.parameters.push(
    new ethereum.EventParam("margin", ethereum.Value.fromUnsignedBigInt(margin))
  )
  positionLiquidatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  positionLiquidatedEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  positionLiquidatedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidatorFee",
      ethereum.Value.fromUnsignedBigInt(liquidatorFee)
    )
  )

  return positionLiquidatedEvent
}

export function createWithdrawEvent(user: Address, amount: BigInt): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawEvent
}

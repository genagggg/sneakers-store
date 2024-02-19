export interface IAddress {
    country: string
    city: string
    street: string
    house: string
}

export interface IShipingFields {
    email: string
    name: string
    address: IAddress
}
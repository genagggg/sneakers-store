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

export interface IOptions {
    value: string
    label: string
}
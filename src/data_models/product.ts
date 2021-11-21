enum productType{ Intergrated = 'Intergrated', Peripheral = 'Peripheral'};

export interface IProduct{
    name:string,
    price:number,
    type:productType,
};
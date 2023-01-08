


interface ReqCreateParking {
    name: string,
    smallSizeAmount: number,
    mediumSizeAmount: number,
    largeSizeAmount: number,
}


interface ReqCreateParkingSlot {
    parkinglotId: string,
    smallSizeAmount: number,
    mediumSizeAmount: number,
    largeSizeAmount: number,
}

interface ReqCustomerParkCar {
    numberPlate: string,
    vehicleType: number,
    parkinglotId: string,
}

interface RespCustomerParkCar {
    numberPlate: string,
    ticketId: string,
    enterAt: Date,
    slotCar:number
}

interface ReqCustomerLeaveParkCar {
    ticketId: string,
}

// interface RespCustomerLeaveParkCar {
//     numberPlate: string,
//     ticketId: string,
//     enterAt: Date,
//     slotCar:number
// }



export {
    ReqCreateParking,
    ReqCreateParkingSlot,
    ReqCustomerParkCar,
    RespCustomerParkCar,
    ReqCustomerLeaveParkCar
}
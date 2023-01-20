type TRajaFrontEnd={
    id:number,
    name:string,
    jikoushokai:string,
    role:string,
    age:number,
    description:string
}
type TRatuBackEnd={
    id:number,
    name:string,
    mission?:string,
    jikoushokai:string,
    role:string,
    age:number,
    description:string
}
type TPadukaFullStek={
      id:number,
      name:string,
      jikoushokai:string,
      role:string,
      age:number
      description:string,
}

export type {
    TRajaFrontEnd,
    TRatuBackEnd,
    TPadukaFullStek,
}
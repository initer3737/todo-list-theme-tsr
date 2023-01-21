type TRajaFrontEnd={
    id:number,
    char_id:string,
    name:string,
    jikoushokai:string,
    role:string,
    age:number,
    description:string
}
type TRatuBackEnd={
    id:number,
    char_id:string,
    name:string,
    mission?:string,
    jikoushokai:string,
    role:string,
    age:number,
    description:string
}
type TPadukaFullStek={
      id:number,
      char_id:string,
      name:string,
      jikoushokai:string,
      role:string,
      age:number
      description:string
}

export type {
    TRajaFrontEnd,
    TRatuBackEnd,
    TPadukaFullStek,
}
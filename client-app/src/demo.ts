export interface Person {
    name : string ;
    age : number ;
    PrintData? : () => void ;        //then return is void
    GetData? : () => {}              //then this function return and object, ? mean that accept to be null
}

const ps1 : Person = {
    name: "asd",
    age: 15,
} 
const ps2 : Person = {
    name: "add",
    age: 15,
} 

//ps1.PrintData();    
//ps1.GetData!();     //! force add this property to object, override on TS behavior bad practice

export const persons = [ps1, ps2];
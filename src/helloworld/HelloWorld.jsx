// export function () {
//     return (
//         <>
//             <ValueHelloWorld />
//         </>
//     );
// }
import './HelloWorld.css'

export default function HelloWorld() {
    const text = { name: "habib", age: 15 };
    return <ValueHelloWorld text={text} />
    // return <ValueHelloWorld {...text} /> 

}

// const props = {
//     text: "Aku habib",
//     age: 23,
//     isCool: true
// };

//pakai (props) itu bisa ngakse props.age kalau ({text}) berarti yang ditampilkan text saja
//namanya destrucction
export function ValueHelloWorld(props) {

    return (
        <>
            <h1 className='children'> {props.text ? `Aku sayang ${props.text.age}` : "tidak ada data"}</h1>
            {/* props ? props.age */}
        </>
    )

}


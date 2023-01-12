import React from "react";
import './Button.css'

// 1 Opção
//export default props =>
// <button className={`
//     button
//     ${props.operation ? 'operation' : '' }
//     ${props.double ? 'double' : '' }
//     ${props.triple ? 'triple' : '' }

// `}>
//     {props.label}
// </button>

/*2 opcao */
export default props => {
    let classes = 'button '
   
    classes += props.operation ? 'operation' : '' 
    classes += props.double ? 'double' : '' 
    classes += props.triple ? 'triple' : '' 

    return(
        <button
            /**Função para pegar o valor do botão clicado */
            onClick={e => props.click && props.click(props.label)}

            className={classes}>
            {props.label}
        </button>
    )

}
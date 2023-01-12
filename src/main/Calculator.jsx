import React,{Component} from 'react'
import Button from '../components/Button'
import Display from '../components/Display'
import './Calculator.css'

/*Criando o estado inicial da calculadora */
const initialState = {
    displayValue:'0',       /*Valor inicial da tela */
    clearDisplay: false,    /**Conferir se precisa limpar o display ou não */
    operation: null,        /**Tipo de operação que será executado */
    values: [0,0],          /**Valores para efetuar a operacao/conta */
    current: 0              /**Indica a posição utilizada no array values */
}

export default class Calculator extends Component{

    /**Chamando o estado inicial dentro da classe*/
    state = {...initialState}

    /*Criando o construtor para nao precisar referenciar novas arow functions na função render()*/
    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }



    /**Funções para calculadora */
    clearMemory() {
        // console.log('Limpar')
        this.setState({...initialState})
    }

    setOperation(operation){
        console.log(operation)
    }

    addDigit(n){
        // console.log(n)
        //Precisamos antes conferir se ja foi digitado o digito (.)ponto para que não haja mais de um instanciado 
        
        //validação
        if(n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        //validação para apagar se for digitado somente 0
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

        //validação dos numeros digitado e armazenando os
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n

        //Adicionando a troca de estado para mostrar os valores mudando
        this.setState({
            displayValue, clearDisplay: false
        })

        //Armazenando e convertendo o valor digitado para o array de de valores
        //e validação se é numero ou não
        if( n !== '.'){
            const i = this.state.current //posicao do array
            const newValue = parseFloat(displayValue) //convertendo texto em numero 
            const values = [...this.state.values] //criando um novo array
            values[i] = newValue //atribuindo os numeros digitados
            this.setState({values})
            console.log(values)
        }

    }

    render(){
        /* Funcão arrow se referenciando com as funções criadas anteriormente*/
        // const addDigit = n => this.addDigit(n)
        // const setOperation = op => this.setOperation(op)

        return(
            <div className='calculator'>
                {/* Iniciando com o valor definido no Estado Inicial */}
                {/* <Display value={100}/> */}
                <Display value={this.state.displayValue}/>

                {/* Usando o construtor nao precisamos passar desta forma */}
                {/* <Button label="AC" click={() => this.clearMemory()}/> */}
                {/* Passaremos assim */}
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit}double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}
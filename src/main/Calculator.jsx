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
        // console.log(operation)
        /*Alterando as configurações para quando clicar num outro numero 
        ele entrar na nova posição de array e fazer as verificações necessarias */
        if(this.state.current === 0){
            this.setState({
                operation,          //selecionando a operação
                current: 1,         //alterando a posição do array para 1
                clearDisplay: true  //alterando a função para limpar quando iniciar o estado 
            })
        }else{
            //Verificando se foi digitado igual
            const equals = operation === '='
            //
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            /**Refatorar mais tarde usando switch case */
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                //tratando o erro do NaN
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                return
                }
            }catch{
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation : equals ? null : operation,          //selecionando a operação
                current: equals ? 0 : 1,         //alterando a posição do array para 1
                clearDisplay: !equals,  //alterando a função para limpar quando iniciar o estado 
                values
            })
        }
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
import React,{Component} from 'react'
import Button from '../components/Button'
import Display from '../components/Display'
import './Calculator.css'

export default class Calculator extends Component{

    /*Criando o construtor para nao precisar referenciar novas arow functions na função render()*/
    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }



    /**Funções para calculadora */
    clearMemory() {
        console.log('Limpar')
    }

    setOperation(operation){
        console.log(operation)
    }

    addDigit(n){
        console.log(n)
    }

    render(){
        /* Funcão arrow se referenciando com as funções criadas anteriormente*/
        // const addDigit = n => this.addDigit(n)
        // const setOperation = op => this.setOperation(op)

        return(
            <div className='calculator'>
                <Display value={100}/>

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
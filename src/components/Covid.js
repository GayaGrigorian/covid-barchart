import React from "react";
import { v4 as uuidv4 } from "uuid";
import Chart from "./Chart";


export default class Covid extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:uuidv4(),
            data:[],
            states:[],
            isLoading:false,
        };
        this.getStateData= this.getStateData.bind(this);
        this.onChange=this.onChange.bind(this);

    } 
    
    componentDidMount(){
        this.getData()
        this.getStateData("ca")
    }

    getData(){
        fetch("https://api.covidtracking.com/v1/states/info.json")
        .then ((res)=>res.json())
        .then (states=>this.setState({states:states.map(state=>state.state)}))
    }

    getStateData=(props)=>{
        fetch(`https://api.covidtracking.com/v1/states/${props}/daily.json`)
        .then ((res)=>res.json())
        .then (response=>this.setState({data:response}))
    }

    onChange=(ev)=>{
        this.setState({state:ev.target.value}); 
        const name=ev.target.value
        this.getStateData(name.toLowerCase())
    }


    render(){
        return(
            <>
            <Chart data={this.state.data} />
            
            <select onChange={this.onChange}>
                <option>Select a State</option>
                {this.state.states.map(state=>(
                <option value={state} key={uuidv4()}> {state} </option>
                ))}
            </select>
            
            <div className="Header">   
                <div className="Title">Date</div>
                <div className="Title">State</div>
                <div className="Title">Positive</div>
                <div className="Title">Death</div>
                <div className="Title">Recovered</div>
            </div>


            {this.state.data.map((state)=>
                <div className="grid-container" key={uuidv4()}>
                <div className='grid-item'>{state.date}</div> 
                <div className='grid-item'>{state.state}</div>
                <div className='grid-item'>{state.positive}</div> 
                <div className='grid-item'>{state.death}</div>
               <div className='grid-item'>{state.recovered}</div>                            
               </div> 
                    
            )}                                       
                
            </> 
           
        )
    }

}
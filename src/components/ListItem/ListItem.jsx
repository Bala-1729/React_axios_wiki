import React, { Component } from "react";
import "./ListItem.css";

export default class ListItem extends Component{    

    render(){
        const items = this.props.items;
        const listItems = items.map(item =>
            {
                return <div className="listContainer">
                    <p className="data" style={{backgroundColor:item.bg_color, textDecoration:item.txt_deco}}><strong>{item.content}</strong></p>
                    <button className="delete" onClick={() => {this.props.deleteItems(item.key)}}>Delete</button>
                    <button className="complete" onClick={() => {this.props.completeItems(item.key)}} style={{backgroundColor:item.btn_color}}>{item.status}</button>
                    <br/><br/><br/>
                </div>
            })
        return(
            <div>{listItems}</div>
        );
    }
}
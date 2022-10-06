import React, {Component} from "react";
import './Contacts.css';
import axios from 'axios';
import ContactDetails from "./ContactDetails";

class Contacts extends Component{
    constructor(props){
        super(props);
        this.state = {
            contacts: [],
            showContacts: false
        }

        // binding the functions
        this.handleShowContacts = this.handleShowContacts.bind(this);
        this.handleAddContact = this.handleAddContact.bind(this);
    }

    // fetching the api and saving the data in a state at the start
    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            this.setState({
                contacts: response.data
            })
        })
    }

    // function for toggling between showing and hiding contacts
    handleShowContacts(){
        this.setState({
            showContacts: !this.state.showContacts
        })
    }

    // function for adding a contact
    handleAddContact(){
        const name = document.getElementById('name');
        const tel = document.getElementById('tel');
        // fetching the api and making a dummy POST call to add the contact to the server
        fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            phone: tel.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        // Saving the contact details in a state
        .then(data => this.setState({ newContact: {data} }));

        // resetting the input values
        name.value = "";
        tel.value = "";
    }

    render(){
        return(
            <div id="app-container">
                <h1>Contact List</h1>

                {/* input for adding a contact */}
                <div id="input">
                    <input id="name" type="text" placeholder="Name" required></input>
                    <input id="tel" type="tel" placeholder="Telephone no." required></input>
                    <button type="submit" onClick={this.handleAddContact}>Add Contact</button>
                </div>

                {/* button to toggle between Showing and hiding contacts */}
                <button id="show-hide-contacts" onClick={this.handleShowContacts}>{!this.state.showContacts ? "Show Contacts" : "Hide Contacts"}</button>
                {this.state.showContacts && <ul id="listOfContacts">
                            {this.state.contacts.map(
                                (contact) =>
                                <li key={contact.email} className="list-group-item">
                                    <ContactDetails contact = {contact}/>
                                </li>
                            )}
                        </ul>}
            </div>
        );
    }
}

export default Contacts;
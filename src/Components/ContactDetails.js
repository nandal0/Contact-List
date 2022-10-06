import React, {Component} from "react";
import './ContactDetails.css';

class ContactDetails extends Component{
    constructor(props){
        super(props);

        // binding the handleDeleteContact, handleEditContact and showMoreDtails functions.
        this.handleDeleteContact = this.handleDeleteContact.bind(this);
        this.handleEditContact = this.handleEditContact.bind(this);
        this.showMoreDetails = this.showMoreDetails.bind(this);
    }

    // fetching api and making a dummy DELETE call to the server
    handleDeleteContact(){
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.contact.id}`, {
            method: 'DELETE',
        });
    }

    // fetching api and making a dummy PUT call to the server
    handleEditContact(){
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.contact.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

    // function for showing details of a contact
    showMoreDetails(){
        const details = document.getElementById(this.props.contact.id);
        details.classList.toggle("show");
    }

    render(){
        const contact = this.props.contact;
        return(
            <div> 
                {/* visible details of a contact */}
                <h3 id="visible-details">
                    {contact.name}
                    <div  id="edit-delete-icons">
                        <i className="fas fa-user-edit" onClick={this.handleEditContact}></i>
                        <i className="far fa-trash-alt" onClick={this.handleDeleteContact}></i>
                    </div>
                </h3>   
                
                {/* hidden details of a contact */}
                <i id="more-details" className="fas fa-chevron-down" onClick={this.showMoreDetails}>
                    <div id={contact.id} className="show">
                        <div id="phone">
                            <i className="details-icons fas fa-phone"></i>
                            {contact.phone}
                        </div>
                        <div id="email">
                            <i className="details-icons fas fa-envelope"></i>
                            {contact.email}
                        </div>
                        <div>
                            <i className="details-icons fas fa-map-marker-alt">Address</i>
                            <div id="address">
                                {"street:"} {contact.address.street} <br></br>
                                {"suite:"} {contact.address.suite} <br></br>
                                {"city:"} {contact.address.city} <br></br>
                                {"zipcode:"} {contact.address.zipcode}
                            </div>
                        </div>
                        <div>{"Website:"} {contact.website}</div>
                    </div>
                </i>
                <hr></hr>
            </div>
        );
    }
}

export default ContactDetails;
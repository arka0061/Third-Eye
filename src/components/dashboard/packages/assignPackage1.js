import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Link } from 'react-router-dom'

class AssignPackage1 extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users');
        this.unsubscribe = null;

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            names: [], from: '', to: '', prefix: '', id1: null, email: '', check: true,
            users: [], key: '', error: null
        }
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        const db = firebase.firestore();
        await db.collection('users').doc(this.state.id1).get()
            .then((res) => {
                this.setState({
                    email: res.data().email
                })
            })
        await db.collection('users').doc(this.state.id1).collection('assignedpackages').doc(this.props.match.params.id).set({
            name: this.props.match.params.id,
            check: false,
        }, { merge: true });

        await db.collection("packages").doc(this.props.match.params.id).set({
            check: false,
            userId: this.state.id1,
            email: this.state.email,
            id1: this.state.id1
        }, { merge: true })

        console.log(" detialss", this.state.email, this.state.id1)

        this.props.history.push("/listPackages")

    }

    onCollectionUpdate = (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            const { name } = doc.data();
            users.push({
                key: doc.id,
                doc, // DocumentSnapshot
                name
            });
        });
        this.setState({
            users
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    render() {
        return (
            <div>
                <br />
                <h1>Add Package</h1>
                <br />
                <form onSubmit={this.handleSubmit}>

                    <div>
                        <label htmlFor="exampleInputPassword1">Select User</label>
                        <br />

                        {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}

                        <select
                            placeholder="select your choice"
                            className="browser-default custom-select"
                            name="id1"
                            value={this.state.id1}
                            onChange={this.handleChange}
                        >
                            <option key="null" value="null" > Select </option>
                            {this.state.users.map((user, key) =>

                                <option key={user.key} value={user.key}>{user.name}</option>
                            )}</select>
                    </div>
                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AssignPackage1;

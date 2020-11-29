import React, { Component } from 'react'
import {TextFieldFormik, Button, Formik, Form} from '../../components';
import {Container, Row, Col} from 'react-bootstrap';
import * as Yup from 'yup';
import {auth, createUserProfileDocument } from '../../firebase/firebase.util';
import { getCurrentUser } from "../../store/actions";
import { connect } from 'react-redux';


const initialValues = {
    email : "",
    // displayName: "",
    password : ""
  };
  
const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Fill this field"),
    // displayName: Yup.string().required("Fill this field"),
    password: Yup.string().required("Fill this field"),
});

class Signup extends Component {

    onSubmit = async (values) => {
        const {email, password} = values;
        
        try {
            const {user} = auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user);
            

        } catch (error) {
            console.error(error);
        }
    };

    
    render() {
        return (
            <>
            <div className="m-3">
                <Container >
                    <div>
                        <h3>Sign Up</h3>
                    </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.onSubmit}
                    >
                    {()=>(
                        <Form>
                            {/* <Row >
                                <Col  >
                                    <TextFieldFormik label = 'Name' name = "displayName" />
                                </Col>
                            </Row> */}
                            <Row >
                                <Col  >
                                    <TextFieldFormik label = 'Email' name = "email" />
                                </Col>
                            </Row>
                            <Row >
                                <Col >
                                    <TextFieldFormik type='password' label = 'Password' name = "password" />
                                </Col>
                            </Row>
                            <Row >
                                <Col  >
                                    <Button type="submit" >Sign up</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                    </Formik>
                </Container>
            </div>
        </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      authUser: data => dispatch(getCurrentUser(data)),
    };
  };
export default connect(null,mapDispatchToProps)(Signup);
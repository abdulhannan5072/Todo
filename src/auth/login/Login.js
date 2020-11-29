import React, { Component } from 'react'
import {TextFieldFormik, Button, Formik, Form} from '../../components';
import {Container, Row, Col} from 'react-bootstrap';
import * as Yup from 'yup';
import {signInWithGoogle, auth } from '../../firebase/firebase.util';


const initialValues = {
    email : "",
    password : ""
  };
  
const validationSchema = Yup.object().shape({
    email: Yup.string().required("Fill this field"),
    password: Yup.string().required("Fill this field"),
});

class Login extends Component {

    onSubmit = (values) => {
        const {email, password} = values;
        
        try {
            auth.signInWithEmailAndPassword(email, password);

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
                        <h3>Login</h3>
                    </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.onSubmit}
                    >
                    {()=>(
                        <Form>
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
                                <Col xs={3} >
                                    <Button type="submit" >Login</Button>
                                </Col>
                                <Col >
                                    <Button onClick={signInWithGoogle} >Login with Google</Button>
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
export default Login;
import React from 'react'
import {TextFieldFormik, Button, Formik, Form, List} from '../components/index';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {addData} from '../store/actions';
import {Container, Row, Col} from 'react-bootstrap';
import {firestore} from '../firebase/firebase.util';


const validationSchema = Yup.object().shape({
    listdata: Yup.string().required("Fill this field"),
});

let id = 0;
let arrList = [];

class TodoList extends React.Component{
    
    state = {
        listdata:'',
        id: '',
        editEnable: false
    }
    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        
        firestore
        .collection("todo")
        .get()
        .then((res) => {
            let list = [];
            res.forEach((check) => {
                let data = {
                    id: check.id,
                    ...check.data()
                }
                list.push(data);
            });
            this.props.addData(list);
        });
        
    }

    onSubmit = (values) => {
        if(this.state.editEnable){
            firestore.doc(`todo/${this.state.id}`).update({
                todoData: values.listdata,
            }).then(res => {
                console.log(res)
            }) 


        } else{
            firestore.collection('todo').add({
                todoData: values.listdata,
                date: new Date(),
            }).then(res => {
                console.log(res)
            })
        }
        this.setState({
            listdata: ''
        })
        this.fetchData();
    };

    onDeleteHandle = (id) => {
        firestore
        .doc(`/todo/${id}`)
        .delete()
        .then((res) => {
            console.log(res);
            this.fetchData();
        });
    }
    onEditHandle = (id, data) => {
        this.setState({
            listdata: data,
            id: id,
            editEnable: true
        })
    }

    render(){
        arrList = [...this.props.list];
        return (
            <>
                <div className="m-3" data-test="todo">
                    <Container >
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            listdata : this.state.listdata
                        }}
                        validationSchema={validationSchema}
                        onSubmit={this.onSubmit}
                        >
                        {()=>(
                            <Form>
                                <Row >
                                    <Col xs={8} >
                                        <TextFieldFormik fullWidth label = 'Enter data' name = "listdata" data-test='textfield'/>
                                    </Col>
                                    <Col xs={4}>
                                        <Button type="submit" data-test='btn'>{this.state.editEnable? "Update data" : "Add data"}</Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                        </Formik>
                    </Container>
                    <Container >
                        <Row>
                            {/* {console.log(arrList)} */}
                        {   
                            arrList.map( ({id, todoData}) =>(
                                    <Col xs={10} key= {id}>
                                        <List text={todoData}  onDelete={() => this.onDeleteHandle(id)} onEdit={() => this.onEditHandle(id,todoData)} />
                                    </Col>
                            ))
                        }
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      list: state.data.listdata
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
      addData: data => dispatch(addData(data)),
    };
};
  
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);

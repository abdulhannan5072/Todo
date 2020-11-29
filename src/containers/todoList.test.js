import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../utils/unitTest';
import TodoList from './TodoList'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

const setUp = (() => {
    let store = mockStore({data: {listdata: [{
        id: "aaaa",
        todoData: "aaas"
    }]}})
    const component = mount(<Provider store = {store}><TodoList /></Provider> );
    return component;
})

describe("Todo list component", ()=>{
    let component;
	beforeEach(() => {
		component = setUp();
    });
    
    test('it should render without errors',()=>{
        const wrapper = findByTestAttr(component, 'todo');
		expect(wrapper.length).toBe(1);
    })

    test('it should contains a textfield',()=>{
        const wrapper = findByTestAttr(component, 'textfield');
		expect(wrapper.length).toBe(7);
    })

    test('it should contains a button',()=>{
        const wrapper = findByTestAttr(component, 'btn');
		expect(wrapper.length).toBe(6);
    })

})

import React from 'react';
import { mount, shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../utils/unitTest';
import AppBar from './index';

const setUp = ((props={}) => {
    const component = shallow(<AppBar {...props} />);
    return component;
})



describe("AppBar component", ()=>{
    let component;
    beforeEach(() => {
        component = setUp();
    });
    describe("Appbar renders", ()=>{
        
        
        test('it should render without errors',()=>{
            const wrapper = findByTestAttr(component, 'appbar');
            expect(wrapper.length).toBe(1);
        })
    
        test('it should render logo',()=>{
            const wrapper = findByTestAttr(component, 'logo');
            expect(wrapper.length).toBe(1);
        })
    })

    describe('Appbar props ', () => {
        
    
        test('it should render without errors', ()=>{

            const expectedProps = {
                signedIn: true,
            }
            const propsErr = checkProps(component, expectedProps);
            expect(propsErr).toBeUndefined();
        })
        // test('it should render logout button',()=>{
    
        //     // const expectedProps = 
        //     const wrapper = findByTestAttr(component, 'logoutbtn');
        //     expect(wrapper.length).toBe(1);
        // })
        // test('it should render login button',()=>{
        //     const wrapper = findByTestAttr(component, 'loginbtn');
        //     expect(wrapper.length).toBe(1);
        // })
    })
    
})


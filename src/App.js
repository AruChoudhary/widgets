import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Header';

const items = [
    {
        title : 'What is React?',
        content : 'React is a frontend javascript framework.'
    },
    {
        title : 'Why use React?',
        content : 'React is a favorite js library among engineers.'
    },
    {
        title : 'How do you use React?',
        content : 'We use react by creating components.'
    }
];

const options = [
    {
        label : 'The Color Red',
        value : 'red'
    },
    {
        label : 'The Color Green',
        value : 'green'
    },
    {
        label : 'A shade of blue',
        value : 'blue'
    }
];

// const showAccordion = () => {
//     if(window.location.pathname === '/'){
//         return <Accordion items={items} />;
//     }
// };

// const showList = () => {
//     if(window.location.pathname === '/list'){
//         return <Search />;
//     } 
// };

// const showDropdown = () => {
//     if(window.location.pathname === '/dropdown'){
//         return <Dropdown />;
//     }
// };

// const showTranslate = () => {
//     if(window.location.pathname === '/translate'){
//         return <Translate />;
//     }
// }

export default () => {
    const [selected, setSelected] = useState(options[0]);
    
    //when you return one jsx component inside other jsx component, 
    //the inner element is provided to the outer one by the prop called children.
    return (
        <div>
            <h1>My Widgets</h1>
            <Header />
            <Route path = "/">
                <Accordion items={items} />
            </Route>
            <Route path = "/list">
                <Search />
            </Route>
            <Route path = "/dropdown">
                <Dropdown 
                    label = "Select a color"
                    options={options}
                    selected={selected}
                    onSelectedChange={setSelected}
                />
            </Route>
            <Route path = "/translate">
                <Translate />
            </Route>
        </div>
    );
};
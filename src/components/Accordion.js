import React, { useState } from 'react';
//{useState} is a hook that gives us access to state inside the function component.



const Accordion = ({items}) => {

    //Array destructuring i.e., we want access of first element of useState and assign it to activeIndex and second to setActiveIndex.
    //activeIndex is a piece of state we are trying to keep track of, some value that is going to change over time
    //setActiveIndex is a function we call to update our piece of state. Anytime we call this setter function, it will cause our entire state to automatically rerender.
    //when we call useState() it takes one argument that will be our default value for piece of state.
    //activeIndex and setActiveIndex are not special variable name, we can cll them whatever we want
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleCLick = (index) => {
        //Updating the value of state
        setActiveIndex(index);
        //console.log('Title Clicked', index);
    };

    //rendering items out as a list using a mapping function. And for each item we are going to return a little bit of jsx
    //Every element inside the list of jsx element has to have a key property.
    //So we'll use item as key property as it is unique.
    //While returning, the first <div> creates an extra element. To avoid that we use React.Fragment
    //We wrapped onClick into an arrow function as we want to call it at some point in future.
    //If we write like onClick={onTitleClick(index)}, it will be invoked all 3 times i.e., the instant the component is rendered
    const renderedItems = items.map((item, index) => {

        const active = index === activeIndex ? 'active' : '';

        return <React.Fragment key={item.title}>
            <div 
                className={`title ${active}`}
                onClick={()=>onTitleCLick(index)}
            >
                <i className="dropdown icon"></i>
                {item.title}
            </div>
            <div className={`content ${active}`}>
                <p>{item.content}</p>
            </div>
        </React.Fragment>    
    });

    return (
        <div className = "ui styled accordion">
            {renderedItems}
        </div>
    );
};

export default Accordion;
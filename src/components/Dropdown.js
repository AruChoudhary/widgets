import React, {useState, useEffect, useRef} from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {

    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(()=>{
        //body event listener will always be to first one to get invoked.
            //ref.current will give reference to that div of ui form
            //it checks whether the element that is clicked on is inside our ref component, if yes then return otherwise close the dropdown
            //if the element is removed from DOM, ref.current will be null

        const onBodyClick = (event)=>{
            if (ref.current && ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };
        document.body.addEventListener('click', onBodyClick , { capture: true });

        //when dropdown component is removed entirely, cleanup function is called, (also called before rendered for the next time).
        //whenever our component is removed in dom, we remove this onBodyClick callback entirely
        return () => {
            document.body.removeEventListener('click', onBodyClick , { capture: true });
        }

    }, []); //we want it to be rendered once.

    const renderedOptions = options.map((option)=>{

        if(option.value===selected.value){
            return null;
        }
        return (
            <div 
                key = {option.value} 
                className="item"
                onClick={()=>onSelectedChange(option)}
            >
                {option.label}
            </div>
        );
    });

    return (
        <div ref ={ref} className="ui form">
            <div className="field">
                <label className="label">
                    {label}
                </label>
                <div 
                    onClick={()=>setOpen(!open)} 
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
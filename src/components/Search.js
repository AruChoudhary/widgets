import React, {useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {

    const [term, setTerm] = useState('programming');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    console.log(results);

    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setDebouncedTerm(term);
        },1000);

        return ()=>{
            clearTimeout(timerId);
        };
    });
    //console.log('I RUN WITH EVERY RENDER'); //Rerendering the component with every single key press!

    //first argument of useEffect is always going to be a function.
    //second argument controls when our function is executed.--> Empty array OR array with values inside it OR no array at all!

    //it will run ONCE right after component is rerendered.
    // useEffect(()=>{
    //     console.log('I ONLY RUN ONCE');
    // }, []);

    // useEffect(()=>{
    //     console.log('I RUN AFTER EVERY RENDER AND AT INITIAL RENDER!');
    // });

    //this will run at start as well as any time the term has change, i.e., every time term changes.
    //Therefore this here will have same effect as no second argument
    //if there are two useStates, the second argument can have two elements inside it as well and will run when either of the element changes
    // useEffect(()=>{
    //     console.log('I RUN AFTER EVERY TIME TERM CHANGES AND AT INITIAL RENDER!');
    // },[term]);

    useEffect(()=>{
        const search = async() =>{
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm
                }
            });
            setResults(data.query.search);
        };
        search();
    }, [debouncedTerm]);

    //we want to search every single time user presses a key
    //we cannot mark our function as async and use await in useEffect(). See lecture 158
    //we can make temporary function inside it for the same
    // useEffect(()=>{
        

    //     //first time render
    //     if(term && !results.length){
    //         search();
    //     } else {
    //         //timer of 500ms i.e., it will be lagged by 1000ms
    //         //Now any time the input is changed, we have to reset the timer
    //         //whenever we use setTimeout(), we get an identifier. So we can clear this timeout by using this identifier!
    //         const timeoutId = setTimeout(() => {
    //             if(term){
    //                 search();
    //             } 
    //         }, 1000);  
        
    //         //We can only return a function from useEffect()
    //         return () => {
    //             clearTimeout(timeoutId);
    //         };
    //     }
    // },[term, results.length]);


    
    //----OR--------

    // useEffect(()=>{
    //     (async() =>{
    //         await axios.get('asbxma');
    //     })();
    // },[term]);

    //---------OR--------

    //use of promises - least often used
    // useEffect(()=>{
    //     axios.get('asamhb').then((response) => {
    //         console.log(response.data);
    //     });
    // },[term]);

    const renderedResults = results.map((result)=>{
        return (
            <div key = {result.pageid} className = "item">
                <div className="right floated content">
                    <a 
                        className="ui button"
                        href = {`https://en.wikipedia.org?curid=${result.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className = "content">
                    <div className = "header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html:result.snippet}}></span>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className = "ui form">
                <div className = "field">
                    <br />
                    <label>Enter Search Term</label>
                    <input 
                        value = {term}
                        onChange = {(e)=>setTerm(e.target.value)}
                        className = "input" 
                    />
                </div>
            </div>
            <div className = "ui celled list">
                {renderedResults}
            </div>
        </div>    
    );
};

export default Search;
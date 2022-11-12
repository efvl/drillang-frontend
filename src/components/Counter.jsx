import React, {useState} from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }


    function decrement() {
        setCount(count - 1);
    }

    return (
        <div>
            <h1>count: {count}</h1>
            <button className="btn btn-primary" onClick={increment}>plus 1</button>
            <button className="btn btn-secondary" onClick={decrement}>minus 1</button>
            <input type="text" value={count} onChange={event => setCount(event.target.value)}/>
        </div>
    );

};

export default Counter;
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <ol>
            <li>
                <Link to={`/transact`}>
                    <h1>
                        1. Account Transaction
                    </h1>
                </Link>
            </li>
            <li>
                <Link to={`/profile`}>
                    <h1>
                        2. Profile Change
                    </h1>
                </Link>
            </li>
            <li>
                <Link to={`/account/register`}>
                    <h1>
                        3. Profile Registration
                    </h1>
                </Link>
            </li>
        </ol>
    );
  }
  export default Home;